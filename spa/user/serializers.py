from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    re_password = serializers.CharField(write_only=True, required=True)
    subscription_type = serializers.ChoiceField(choices=User.SubscriptionType.choices, default=User.SubscriptionType.FREEMIUM)

    class Meta:
        model = User
        fields = ( 'email', 'first_name', 'last_name', 'password', 're_password', 'subscription_type')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
        }

    def validate_email(self, value):
        #normalize and validate email
        value = User.objects.normalize_email(value)
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with that email already exists.')
        return value
    
    def validate(self, data):
        #check passwords
        if data['password'] != data['re_password']:
            raise serializers.ValidationError({'password': "The two password fields did not match"})
        return data
    
    def validate_password(self, value):
        validate_password(value)
        return value
    
    def create(self, validated_data):
        #Remove the re_password field before creating the user
        validated_data.pop('re_password', None)
        return User.objects.create_user(**validated_data)
        