from rest_framework import serializers
from .models import TestModel, Question, Comment, TestResult, UserAnswer

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
    test_title = serializers.ReadOnlyField(source='test.title')
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')

    class Meta:
        model = TestResult
        fields = ('id', 'test_title', 'user_full_name', 'score', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at', )

class UserAnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.ReadOnlyField(source='question.context')
    
    class Meta:
        model = UserAnswer
        fields = ('id', 'test_result', 'question_text', 'selected_option', )
        read_only_fields = ('test_result', 'question_text', 'selected_option' ,)