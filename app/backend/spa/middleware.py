# spa/auth.py
import firebase_admin
from firebase_admin import auth as firebase_auth
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions

User = get_user_model()

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            token = auth_header.split(' ')[1]
            decoded_token = firebase_auth.verify_id_token(token)
            uid = decoded_token['uid']

            user, created = User.objects.get_or_create(firebase_uid=uid, defaults={'email': decoded_token.get('email')})
            return (user, None)
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Firebase authentication failed: {str(e)}')
