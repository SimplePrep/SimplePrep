"""
Views for the Test APIs
"""
from rest_framework import generics, viewsets, authentication, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from core2.models import (
    Test,
    Question,
    Subject,
    Topic, 
    TestSection,
)
from core2.serializers import (
    SubjectSerializer,
    TestSerializer,
    TopicSerializer,
    TestSectionSerializer,
    QuestionSerializer,
)

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = TestSection.objects.all()
    serializer_class = TestSectionSerializer

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

    @action(detail=True)
    def sections(self, request, pk):
        test = self.get_object()
        sections = test.testsection_set.all()
        serializer = TestSectionSerializer(sections, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return self.queryset.filter().order_by('id')
    
class TestSectionQuestions(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        testsection_id = self.kwargs['testsection_pk']
        questions = Question.objects.filter(testquestion__testsection_id=testsection_id)
        return questions.order_by('id')