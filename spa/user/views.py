# from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
User = get_user_model()

class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            
            data = serializer.validated_data
            first_name = data['first_name']
            last_name = data['last_name']
            email = data['email']
            email = email.lower()
            password = data['password']
            re_password = data.get('re_password')
            subscription_type = data.get('subscription_type')

            if password != re_password:
                return Response(
                    {"error": 'Passwords do not match'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if User.objects.filter(email=email).exists():
                return Response(
                    {'error': "Email already exists"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user = User.objects.create_user(
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=password,
                subscription_type = subscription_type
            )
            return Response(
                {'success': 'User account created succesfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class RetrieveUserView(APIView):
    def get(self, request):
        try:
            user = request.user
            serializer = UserSerializer(user)
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Something went wrong while retrieving user account details -> {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )