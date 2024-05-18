from django.urls import path, include

app_name = 'two_factor'
urlpatterns = [
    path('', include('two_factor.urls')),
]