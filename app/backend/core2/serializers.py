from rest_framework import serializers
from .models import Tutorial, Chapter, Section, PracticeQuestion, UserProgress

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class PracticeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeQuestion
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

class TutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = '__all__'

class UserProgressSerializer(serializers.ModelSerializer):
    section = SectionSerializer()
    chapter = ChapterSerializer()

    class Meta:
        model = UserProgress
        fields = ['id', 'user', 'section', 'chapter', 'completed', 'progress', 'last_accessed']