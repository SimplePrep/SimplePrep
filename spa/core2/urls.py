from django.urls import path
from .views import TutorialView, SectionView, SectionDetailView

urlpatterns = [
    path('tutorials/', TutorialView.as_view(), name='tutorial-list'),
    path('tutorials/<int:id>/sections/', SectionView.as_view()),
    path('sections/<slug:slug>/', SectionDetailView.as_view())
]
