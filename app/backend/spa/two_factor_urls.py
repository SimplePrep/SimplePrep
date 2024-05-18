from django.urls import path, include
import two_factor.urls

app_name = 'two_factor'
urlpatterns = [
    path('', include(two_factor.urls)),
]