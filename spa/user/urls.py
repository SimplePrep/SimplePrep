from django.urls import path
from .views import SignUpView, RetrieveUserView, LoginView

urlpatterns = [
    path('signup', SignUpView.as_view()),
    path('me', RetrieveUserView.as_view()),
    path('login', LoginView.as_view())
]
