from django.urls import path
from .views import SignUpView, RetrieveUserView

urlpatterns = [
    path('signup', SignUpView.as_view()),
     path('me', RetrieveUserView.as_view())
]
