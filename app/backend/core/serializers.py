from rest_framework import serializers
from .models import Test, TestModel, Question, Comment, TestResult, UserAnswer

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'


class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    graph_img = serializers.ImageField(use_url=True, required=False, allow_null=True)
    
    class Meta:
        model = Question
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')

    class Meta:
        model = Comment
        fields = ('id', 'test', 'user_full_name', 'text', 'created_at')
        read_only_fields = ('created_at',) 
    
class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', )

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = '__all__'