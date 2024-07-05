from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Tutorial, Section
from .serializers import TutorialSerializer, SectionSerializer

class TutorialListCreateView(generics.ListCreateAPIView):
    serializer_class = TutorialSerializer

    def get_queryset(self):
        return Tutorial.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching tutorials: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while creating tutorial: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SectionListCreateView(generics.ListCreateAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        module_id = self.kwargs.get('id')
        if module_id:
            return Section.objects.filter(module_id=module_id).order_by('id')
        return Section.objects.none()

    def list(self, request, *args, **kwargs):
        if not self.kwargs.get('id'):
            return Response(
                {'error': 'Tutorial ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching sections: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while creating section: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SectionDetailView(generics.RetrieveAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching section: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
