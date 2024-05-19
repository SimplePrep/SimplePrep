from django.urls import path
from .views import StoreTempUserView, VerifyUserEmailView, RetrieveUserView, LoginView

urlpatterns = [
    path('store-temp-user', StoreTempUserView.as_view()),
    path('verify-user-email', VerifyUserEmailView.as_view()),
    path('user', RetrieveUserView.as_view()),
    path('login', LoginView.as_view())
]
