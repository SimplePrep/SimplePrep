from rest_framework import serializers
from .models import Tutorial, Chapter, Section, PracticeQuestion, UserProgress
from math import floor
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
    completed = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = ['id', 'slug', 'title', 'completed']
    
    def get_completed(self, obj):
        user = self.context['request'].user
        return UserProgress.objects.filter(user=user, section=obj, completed=True).exists()


class ChapterProgressSerializer(serializers.ModelSerializer):
    sections = SectionProgressSerializer(many=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Chapter
        fields = ['id', 'title', 'sections', 'progress']
    

    def get_progress(self, obj):
        user = self.context['request'].user
        total_sections = obj.sections.count()
        completed_sections = UserProgress.objects.filter(user=user, section__chapter=obj, completed=True).count()
        if total_sections > 0:
            return floor((completed_sections / total_sections) * 100)
        return 0

class TutorialProgressSerializer(serializers.ModelSerializer):
    chapters = ChapterProgressSerializer(many=True)

    class Meta:
        model = Tutorial
        fields = ['id', 'chapters']