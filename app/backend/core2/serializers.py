from rest_framework import serializers
from .models import Tutorial, Section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"

        
class TutorialSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    class Meta:
        model = Tutorial
        fields = "__all__"