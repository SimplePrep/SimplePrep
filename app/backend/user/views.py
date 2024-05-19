from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model
from firebase_admin import auth as firebase_auth
from .serializers import UserSerializer, TempUserSerializer
from firebase_admin import auth
from .models import TempUser, User
import logging
User = get_user_model()
# Configure logging
logger = logging.getLogger(__name__)

class VerifyUserEmailView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        firebase_uid = request.data.get('firebase_uid')
        if not firebase_uid:
            logger.error("firebase_uid is required")
            return Response({'error': "firebase_uid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = firebase_auth.verify_id_token(firebase_uid)
            logger.info("Token successfully verified")
        except Exception as e:
            logger.error(f"Token verification failed: {e}")
            return Response({'error': "Token verification failed", 'details': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            temp_user = TempUser.objects.get(firebase_uid=firebase_uid)
            logger.info(f"Temporary user found: {temp_user.email}")
            user = User.objects.create_user(
                email=temp_user.email,
                first_name=temp_user.first_name,
                last_name=temp_user.last_name,
                firebase_uid=firebase_uid,
                subscription_type=User.SubscriptionType.FREEMIUM,  # Set default subscription type
            )
            temp_user.delete()  # Remove the temporary user data
            logger.info(f"Temporary user deleted: {temp_user.email}")
            return Response({'success': "User email verified and account created"}, status=status.HTTP_200_OK)
        except TempUser.DoesNotExist:
            logger.error("Temporary user not found")
            return Response({'error': "Temporary user not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RetrieveUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    

class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        firebase_token = request.data.get('firebase_token')
        if not firebase_token:
            return Response({'error': 'Firebase token is missing.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the Firebase Authentication token
            decoded_token = firebase_auth.verify_id_token(firebase_token)
            uid = decoded_token['uid']
            email = decoded_token.get('email', None)

            # Create or update the Django user based on the Firebase user data
            user, created = User.objects.get_or_create(
                firebase_uid=uid, 
                defaults={'email': email, 'first_name': decoded_token.get('name', '').split(' ')[0], 'last_name': decoded_token.get('name', '').split(' ')[1] or ''}
            )
            if not created and user.email != email:  # Optionally update email if it changes in Firebase
                user.email = email
                user.save()

            # Return the user data or any other relevant information
            return Response({'message': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
        except firebase_auth.InvalidIdTokenError:
            return Response({'error': 'Invalid Firebase token.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StoreTempUserView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({'error': "Authorization header missing"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token = auth_header.split(' ')[1]
            decoded_token = firebase_auth.verify_id_token(token)
            firebase_uid = decoded_token['uid']
        except Exception as e:
            return Response({'error': "Token verification failed", 'details': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data.copy()
        data['firebase_uid'] = firebase_uid
        serializer = TempUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': "Temporary user data stored successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
