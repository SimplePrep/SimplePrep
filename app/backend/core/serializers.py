from rest_framework import serializers
from .models import Test, TestModel, Question, TestResult, UserAnswer, TestReport, Reply, Post

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'title', 'created_at', 'updated_at']


class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = ['id', 'test', 'title', 'description', 'num_questions', 'created_at', 'updated_at']


class QuestionSerializer(serializers.ModelSerializer):
    graph_img = serializers.ImageField(use_url=True, required=False, allow_null=True)
    
    class Meta:
        model = Question
        fields = [
            'id', 'test', 'model', 'section', 'title', 'context', 'query', 
            'graph_img', 'option_A', 'option_B', 'option_C', 'option_D', 
            'explanation', 'correct_answer', 'likes', 'dislikes', 'created_at'
        ]

class TestResultSerializer(serializers.ModelSerializer):
    test_model = TestModelSerializer(read_only=True)

    class Meta:
        model = TestResult
        fields = ['id', 'score', 'created_at', 'updated_at', 'test_model']


class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ['id', 'test_result', 'question', 'selected_option']


class TestReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestReport
        fields = ['id', 'test_result', 'report_data', 'created_at', 'updated_at']

class ReplySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.get_full_name')
    author_uid = serializers.ReadOnlyField(source='author.firebase_uid')
    class Meta:
        model = Reply
        fields = ['id', 'author', 'author_uid', 'content', 'created_at', 'updated_at']


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.get_full_name')
    author_uid = serializers.ReadOnlyField(source='author.firebase_uid')
    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'test_module', 'title', 'content', 'author', 'author_uid', 'views', 'likes', 'created_at', 'updated_at', 'replies']
