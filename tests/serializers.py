from rest_framework import serializers
from .models import TestModel

class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = ['id', 'title', 'description', 'num_questions', 'created_at']
        read_only_fields = ['id']

