from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import TempUser

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    subscription_type = serializers.ChoiceField(choices=User.SubscriptionType.choices, default=User.SubscriptionType.Free)
    firebase_uid = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'subscription_type', 'firebase_uid', 'created_at', 'updated_at')
        read_only_fields = ('id', 'firebase_uid', 'created_at')

    def validate_email(self, value):
        value = User.objects.normalize_email(value)
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with that email already exists.')
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        
class SuperUserSerializer(UserSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    re_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        fields = UserSerializer.Meta.fields + ('password', 're_password')

    def validate(self, data):
        if data['password'] != data['re_password']:
            raise serializers.ValidationError({"re_password": "The two password fields didn't match."})
        return data
    
    def create(self, validated_data):
        validated_data.pop('re_password', None)
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        if 'password' in validated_data:
            password = validated_data.pop('password', None)
            if password:
                instance.set_password(password)
                instance.save()
        return instance

class TempUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempUser
        fields = ['firebase_uid', 'email', 'first_name', 'last_name']
