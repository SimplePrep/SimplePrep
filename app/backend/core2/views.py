from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Tutorial, Chapter, Section, PracticeQuestion, UserProgress
from .serializers import TutorialSerializer, ChapterSerializer, SectionSerializer, PracticeQuestionSerializer, UserProgressSerializer
from rest_framework.views import APIView

class TutorialListCreateView(generics.ListCreateAPIView):
    serializer_class = TutorialSerializer
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching practice question: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class TutorialProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        tutorial_id = kwargs.get('tutorial_id')
        progress_data = UserProgress.objects.filter(user=user, section__chapter__tutorial_id=tutorial_id)
        serializer = UserProgressSerializer(progress_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = request.user
        tutorial_id = kwargs.get('tutorial_id')
        section_id = request.data.get('section_id')
        is_completed = request.data.get('is_completed', False)

        try:
            progress_instance = UserProgress.objects.get(user=user, section__id=section_id)
        except UserProgress.DoesNotExist:
            return Response({'error': 'Progress entry not found.'}, status=status.HTTP_404_NOT_FOUND)

        progress_instance.is_completed = is_completed
        progress_instance.save()

        return Response({'message': 'Progress updated successfully.'}, status=status.HTTP_200_OK)
