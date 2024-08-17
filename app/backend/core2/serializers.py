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

class SectionProgressSerializer(serializers.ModelSerializer):
    completed = serializers.BooleanField(source='progress.completed')

    class Meta:
        model = Section
        fields = ['id', 'slug', 'title', 'completed']

class ChapterProgressSerializer(serializers.ModelSerializer):
    sections = SectionProgressSerializer(many=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Chapter
        fields = ['id', 'title', 'sections', 'progress']

    def get_progress(self, obj):
        total_sections = obj.sections.count()
        completed_sections = obj.sections.filter(progress__completed=True).count()
        if total_sections > 0:
            return (completed_sections / total_sections) * 100
        return 0

class UserProgressSerializer(serializers.ModelSerializer):
    chapter = ChapterProgressSerializer(source='section.chapter')

    class Meta:
        model = UserProgress
        fields = ['id', 'chapter']