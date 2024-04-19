from rest_framework import serializers
from .models import Tutorial, Section

class TutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = "__all__"


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"

        