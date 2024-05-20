import firebase_admin
from firebase_admin import auth as firebase_auth
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth import get_user_model

User = get_user_model()

class FirebaseAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                token = auth_header.split(' ')[1]
                decoded_token = firebase_auth.verify_id_token(token)
                uid = decoded_token['uid']
                
                # Get or create user in the database
                user, created = User.objects.get_or_create(firebase_uid=uid, defaults={'email': decoded_token['email']})
                request.user = user
            except Exception as e:
                request.user = None
        else:
            request.user = None