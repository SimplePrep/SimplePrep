from rest_framework.views import APIView
from .models import Tutorial, Section
from .serializers import TutorialSerializer, SectionSerializer
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class TutorialView(APIView):
    def get(self, request, format=None):
        try:
            tutorials = Tutorial.objects.all()
            serializer = TutorialSerializer(tutorials, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e: 
            return Response(
                {'error': f"Something went wrong while fetching tutorial -> {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    def post(self, request, format=None):
        try:
            serializer = TutorialSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e: 
            return Response(
                {'error': f"Something went wrong while fetching tutorial -> {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SectionView(APIView):
    def get(self, request, id=None, format=None):
        if id is not None:
            sections = Section.objects.filter(module_id=id)
            serializer = SectionSerializer(sections, many=True)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'Tutorial ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def post(self, request, format=None):
        try:
            serializer = SectionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e: 
            return Response(
                {'error': f"Something went wrong while fetching tutorial -> {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class SectionDetailView(APIView):
    def get(self, request, slug=None, format=None):
        section = get_object_or_404(Section, slug=slug)
        serializer = SectionSerializer(section)
        return Response(serializer.data)