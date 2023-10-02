from rest_framework import serializers
from .models import (
    Test,
    Subject,
    TestSection,
    Topic,
    Question,
)

class SubjectSerializer(serializers.ModelSerializer):
    """Serializer for Subject - english or math"""
    class Meta:
        model = Subject
        fields = ['id', 'name']

class TopicSerializer(serializers.ModelSerializer):
    """Serializer for Topics"""
    subject = SubjectSerializer(read_only=True)
    class Meta:
        model = Topic
        fields = ['id', 'name', 'subject']

class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for topic questions"""
    topic = TopicSerializer(read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'name', 'context', 'query', 'options', 'correct_index', 'topic']

class TestSectionSerializer(serializers.ModelSerializer):
    """Serializer for Test Sections"""
    class Meta:
        model = TestSection
        fields = ['id', 'name', 'num_questions']

class TestSerializer(serializers.ModelSerializer):
    """Serializer for Test"""
    testsections = TestSectionSerializer(many=True, read_only=True)
    class Meta:
        model = Test
        fields = ['id', 'name', 'testsections']