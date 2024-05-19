from django.urls import path
from .views import SignupView,  RetrieveUserView, LoginView

urlpatterns = [
    path('signup', SignupView.as_view()),
    path('user', RetrieveUserView.as_view()),
    path('login', LoginView.as_view())
]
