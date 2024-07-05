from rest_framework import serializers
from .models import Tutorial, Chapter, Section, PracticeQuestion

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

class PracticeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeQuestion
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    practice_questions = PracticeQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'

class TutorialSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Tutorial
        fields = '__all__'
