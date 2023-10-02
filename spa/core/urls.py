"""
URL mappings for the blogpost app.
"""

from django.urls import (path, include)

from rest_framework.routers import DefaultRouter

from core import views

router = DefaultRouter()

router.register('blogposts', views.BlogPostViewSet)
router.register('tags', views.TagViewSet)

app_name = 'core'

urlpatterns = [
    path('', include(router.urls)),
]
