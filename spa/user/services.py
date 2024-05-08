import firebase_admin
from firebase_admin import auth

def create_firebase_user(email, password):
    user = auth.create_user(email=email, password=password)
    print('Successfully created new user:', user.uid)
    return user
