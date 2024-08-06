from django.urls import path
from .views import SignUpView,  RetrieveUserView, LoginView, CheckUserView, UpdateUserView, DeleteUserView, SupportEmailHandle

urlpatterns = [
    path('signup', SignUpView.as_view(), name='signup'),
    path('user-details', RetrieveUserView.as_view(), name='user-details'),
    path('login', LoginView.as_view(), name='login'),
    path('check-user', CheckUserView.as_view(), name='check-user'),
    path('update-user', UpdateUserView.as_view(), name='update-user'),
    path('delete-account', DeleteUserView.as_view(), name='delete-account'),
    path('send-support-email', SupportEmailHandle.as_view(), name='send-support-email')
]
