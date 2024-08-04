from django.urls import path
from .views import SignUpView,  RetrieveUserView, LoginView, CheckUserView, UpdateUserView, DeleteUserView

urlpatterns = [
    path('signup', SignUpView.as_view()),
    path('user-details', RetrieveUserView.as_view()),
    path('login', LoginView.as_view()),
    path('check-user', CheckUserView.as_view()),
    path('update-user', UpdateUserView.as_view()),
    path('delete-account', DeleteUserView.as_view())
]
