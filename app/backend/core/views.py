from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import (
    TestSerializer,
    TestModelSerializer,
    QuestionSerializer,
    CommentSerializer,
    TestResultSerializer,
    UserAnswerSerializer)
from .models import (
    TestModel, 
    Question, 
    Comment, 
    TestResult, 
    UserAnswer,
    Test)
from .permissions import IsAuthenticatedWithFirebase


class ManageTestView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, format=None):
        try:
            tests = Test.objects.all()
            serializer = TestSerializer(tests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e: 
            return Response(
                {'error': f'Something went wrong while retrieving tests -> {Exception}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    def post(self, request, format=None):
        try:
            serializer = TestSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Something went wrong while retrieving tests -> {Exception}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ManageTestModuleView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, test_id, format=None):
        try:
            test_modules = TestModel.objects.filter(test_id=test_id)
            serializer = TestModelSerializer(test_modules, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e: 
            return Response(
                {'error': f'Something went wrong while retrieving tests -> {Exception}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request, test_id, format=None):
        try:
            data = request.data 
            data['test'] = test_id
            serializer = TestModelSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': f'Something went wrong while retrieving tests -> {Exception}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class QuestionListCreateView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, test_module_id, format=None):
        try:
            questions = Question.objects.filter(test_id=test_module_id).order_by('id')
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data)
        except Exception as e: 
            return Response(
                {'error': f"Something went wrong while fetching questionlist -> {Exception}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request, test_module_id, format=None):
        try:
            serializer = QuestionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(test_module_id=test_module_id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e: 
            return Response(
                {'error': f"Something went wrong while fetching questionlist -> {Exception}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class CommentListCreateView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, test_id, format=None):
        comments = Comment.objects.filter(test_id=test_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    def post(self, request, test_id, format=None):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, test_id=test_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TestResultCreateView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, user_id, format=None):
        if request.user.id == int(user_id):
            try:
                test_results = TestResult.objects.filter(user_id=user_id)
                serializer = TestResultSerializer(test_results, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(
                    {'error': f"Something went wrong while fetching test results -> {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            return Response(
                {'error': 'You are not authorized to view these test results'},
                status=status.HTTP_403_FORBIDDEN)

    def post(self, request, user_id, test_id, format=None):
        if request.user.id != int(user_id):
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        user = get_object_or_404(request.user.__class__, id=user_id)
        test = get_object_or_404(TestModel, id=test_id)

        serializer = TestResultSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            test_result, created = TestResult.objects.update_or_create(
                user=user,
                test_model=test,
                defaults={'score': serializer.validated_data.get('score')}
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserAnswerView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]
    
    def get(self, request, test_result_id, format=None):
        test_result = get_object_or_404(TestResult, pk=test_result_id)
        if request.user != test_result.user:
            return Response(
                {'error': 'You are not authorized to view these answers'},
                status=status.HTTP_403_FORBIDDEN
            )
        try:
            answers = UserAnswer.objects.filter(test_result_id=test_result_id)
            serializer = UserAnswerSerializer(answers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f"Something went wrong while fetching user answers -> {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def post(self, request, test_result_id, format=None):
        test_result = get_object_or_404(TestResult, pk=test_result_id)
        if request.user != test_result.user:
            return Response(
                {'error': "You are not authorized to answer these questions"},
                status=status.HTTP_403_FORBIDDEN
            )

        data = request.data
        if not isinstance(data, list):
            return Response({'error': 'Invalid data format, expected a list'}, status=status.HTTP_400_BAD_REQUEST)

        responses = []
        for answer_data in data:
            answer_data['test_result'] = test_result_id
            serializer = UserAnswerSerializer(data=answer_data)
            if serializer.is_valid():
                serializer.save()
                responses.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(responses, status=status.HTTP_201_CREATED)