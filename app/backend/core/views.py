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
    UserAnswerSerializer,
    TestReportSerializer)
from .models import (
    TestModel, 
    Question, 
    Comment, 
    TestResult, 
    UserAnswer,
    Test,
    TestReport)
from .permissions import IsAuthenticatedWithFirebase
from django.contrib.auth import get_user_model
import logging
from .analytics_algo import generate_report

logger = logging.getLogger(__name__)

User = get_user_model()

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
    
class UserTestModulesView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, user_uid, format=None):
        user = get_object_or_404(User, firebase_uid=user_uid)
        if request.user != user:
            return Response({"error": "You are not authorized to view these test results."}, status=status.HTTP_403_FORBIDDEN)
        
        test_results = TestResult.objects.filter(user=user).order_by('-created_at')[:10]
        serializer = TestResultSerializer(test_results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, user_uid, format=None):
        logger.debug(f"Received user_uid: {user_uid}")
        user = get_object_or_404(User, firebase_uid=user_uid)
        if request.user != user:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        test_module_id = request.data.get('test_module_id')
        logger.debug(f"Received test_id: {test_module_id}")
        test_module = get_object_or_404(TestModel, id=test_module_id)

        data = request.data.copy()
        data['user'] = user.id

        serializer = TestResultSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            test_result, created = TestResult.objects.update_or_create(
                user=user,
                test_model=test_module,
                defaults={'score': serializer.validated_data.get('score')}
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

class UserTestModuleAnswersView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, user_uid, test_module_id, format=None):
        user = get_object_or_404(User, firebase_uid=user_uid)
        if request.user != user:
            return Response({"error": "You are not authorized to view these answers."}, status=status.HTTP_403_FORBIDDEN)
        
        test_result = get_object_or_404(TestResult, user=user, test_model_id=test_module_id)
        answers = UserAnswer.objects.filter(test_result=test_result)
        serializer = UserAnswerSerializer(answers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, user_uid, test_module_id, format=None):
        user = get_object_or_404(User, firebase_uid=user_uid)
        if request.user != user:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        test_result, created = TestResult.objects.get_or_create(
            user=user,
            test_model_id=test_module_id,
            defaults={'score': 0}  # or other defaults if necessary
        )

        if not created:
            UserAnswer.objects.filter(test_result=test_result).delete()

        user_answers = request.data  # Assuming data is a list of answers
        if not isinstance(user_answers, list):
            return Response({'error': 'Invalid data format, expected a list of answers'}, status=status.HTTP_400_BAD_REQUEST)

        responses = []
        for answer_data in user_answers:
            answer_data['test_result'] = test_result.id
            serializer = UserAnswerSerializer(data=answer_data)
            if serializer.is_valid():
                serializer.save()
                responses.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        report = generate_report(test_result)
        return Response(responses, status=status.HTTP_201_CREATED)
    
class TestModuleDetailView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, user_uid, test_module_id, format=None):
        user = get_object_or_404(User, firebase_uid=user_uid)
        if request.user != user:
            return Response({"error": "You are not authorized to view these answers."}, status=status.HTTP_403_FORBIDDEN)
        test_module = get_object_or_404(TestModel, id=test_module_id)
        questions = Question.objects.filter(test=test_module).order_by('id')
        question_serializer = QuestionSerializer(questions, many=True)
        test_result = TestResult.objects.filter(user=request.user, test_model=test_module).first()
        user_answers = UserAnswer.objects.filter(test_result=test_result)
        user_answer_serializer = UserAnswerSerializer(user_answers, many=True)
        return Response({
            'test_module': TestModelSerializer(test_module).data,
            'questions': question_serializer.data,
            'user_answers': user_answer_serializer.data
        }, status=status.HTTP_200_OK)

class TestReportView(APIView):
    permission_classes = [IsAuthenticatedWithFirebase]

    def get(self, request, test_result_id, format=None):
        test_result = get_object_or_404(TestResult, id=test_result_id)
        serializer = TestReportSerializer(test_result)
        return Response(serializer.data, status=status.HTTP_200_OK)