from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from .serializers import UserSerializer
from .services import create_firebase_user
from firebase_admin import auth


User = get_user_model()

class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data['email'].lower()
            password = data['password'] 

            if data['password'] != data.get('re_password'):
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({'error': "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                firebase_user = create_firebase_user(email=email, password=password)

                user = User.objects.create_user(
                    email=email,
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    password=data['password'],
                    firebase_uid = firebase_user.uid,
                    subscription_type=data.get('subscription_type', User.SubscriptionType.FREEMIUM)
                )
                return Response({'success': "User account created successfully"}, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetrieveUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        firebase_token = request.data.get('firebase_token')
        if not firebase_token:
            return Response({'error': 'Firebase token is missing.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the Firebase Authentication token
            decoded_token = firebase_auth.verify_id_token(firebase_token)
            uid = decoded_token['uid']
            email = decoded_token.get('email', None)
            name = decoded_token.get('name', None)

            # Create or update the Django user based on the Firebase user data
            user, created = User.objects.get_or_create(firebase_uid=uid, defaults={'email': email, 'first_name': 'User', 'last_name': 'Default'})
            if not created:
                if email and user.email != email:
                    user.email = email
                if name:
                    names = name.split(' ', 1)
                    user.first_name = names[0]
                    user.last_name = names[1] if len(names) > 1 else ''
                user.save()

            # Return the user data or any other relevant information
            return Response({'message': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
        except firebase_auth.InvalidIdTokenError:
            return Response({'error': 'Invalid Firebase token.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
