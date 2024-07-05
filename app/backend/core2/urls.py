from django.urls import path
from .views import TutorialListCreateView, SectionListCreateView, SectionDetailView, TutorialDetailView

urlpatterns = [
    path('tutorials/', TutorialListCreateView.as_view(), name='tutorial-list-create'),
    path('tutorials/<int:id>/', TutorialDetailView.as_view(), name='tutorial-detail'),
    path('tutorials/<int:id>/sections/', SectionListCreateView.as_view(), name='section-list-create'),
    path('sections/<slug:slug>/', SectionDetailView.as_view(), name='section-detail'),
]
