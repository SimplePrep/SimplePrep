from rest_framework.views import APIView
from .models import TestModel
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import TestModelSerializer

class ManageTestView(APIView):
    def get(self, request, format=None):
        pass


