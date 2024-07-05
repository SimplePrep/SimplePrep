from rest_framework import generics, status
from rest_framework.response import Response
from .models import Tutorial, Chapter, Section, PracticeQuestion
from .serializers import TutorialSerializer, ChapterSerializer, SectionSerializer, PracticeQuestionSerializer

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

class TutorialDetailView(generics.RetrieveAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching tutorial: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ChapterListCreateView(generics.ListCreateAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        tutorial_id = self.kwargs.get('tutorial_id')
        if tutorial_id:
            return Chapter.objects.filter(tutorial_id=tutorial_id).order_by('order')
        return Chapter.objects.none()

    def list(self, request, *args, **kwargs):
        if not self.kwargs.get('tutorial_id'):
            return Response(
                {'error': 'Tutorial ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching chapters: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while creating chapter: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SectionListCreateView(generics.ListCreateAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        chapter_id = self.kwargs.get('chapter_id')
        if chapter_id:
            return Section.objects.filter(chapter_id=chapter_id).order_by('id')
        return Section.objects.none()

    def list(self, request, *args, **kwargs):
        if not self.kwargs.get('chapter_id'):
            return Response(
                {'error': 'Chapter ID is required'},
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

class PracticeQuestionListCreateView(generics.ListCreateAPIView):
    serializer_class = PracticeQuestionSerializer

    def get_queryset(self):
        chapter_id = self.kwargs.get('chapter_id')
        if chapter_id:
            return PracticeQuestion.objects.filter(chapter_id=chapter_id).order_by('id')
        return PracticeQuestion.objects.none()

    def list(self, request, *args, **kwargs):
        if not self.kwargs.get('chapter_id'):
            return Response(
                {'error': 'Chapter ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching practice questions: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while creating practice question: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class PracticeQuestionDetailView(generics.RetrieveAPIView):
    queryset = PracticeQuestion.objects.all()
    serializer_class = PracticeQuestionSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching practice question: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
