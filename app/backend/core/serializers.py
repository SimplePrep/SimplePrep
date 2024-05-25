from rest_framework import serializers
from .models import Test, TestModel, Question, Comment, TestResult, UserAnswer, TestReport

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


class CommentSerializer(serializers.ModelSerializer):
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')

    class Meta:
        model = Comment
        fields = ['id', 'test', 'user_full_name', 'text', 'created_at']
        read_only_fields = ['created_at']


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
