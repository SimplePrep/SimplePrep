from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import authentication, exceptions
import firebase_admin.auth as auth

User = get_user_model()

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # Get the token from the Authorization header
        authorization_header = request.headers.get('Authorization')
        if not authorization_header:
            return None
        
        # Expecting header as 'Bearer <token>'
        token = authorization_header.split(' ')[1] if len(authorization_header.split(' ')) == 2 else None
        if not token:
            return None
        
        try:
            # Verify Firebase auth token
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token.get('uid')
        except auth.InvalidIdTokenError:
            raise exceptions.AuthenticationFailed('Invalid authentication token.')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication error: {str(e)}')

        try:
            # Retrieve or create the user based on Firebase UID
            user, created = User.objects.get_or_create(firebase_uid=uid, defaults={'email': decoded_token.get('email'), 'first_name': 'Default', 'last_name': 'User'})
            return (user, None)  # Authentication successful
        except ObjectDoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

