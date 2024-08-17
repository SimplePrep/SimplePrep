from django.urls import path
from .views import (
    TutorialListCreateView, 
    TutorialDetailView, 
    ChapterListCreateView, 
    SectionListCreateView, 
    SectionDetailView, 
    PracticeQuestionListCreateView, 
    PracticeQuestionDetailView,
    TutorialProgressView
)

urlpatterns = [
    path('tutorials/', TutorialListCreateView.as_view(), name='tutorial-list-create'),
    path('tutorials/<int:id>/', TutorialDetailView.as_view(), name='tutorial-detail'),
    path('tutorials/<int:tutorial_id>/chapters/', ChapterListCreateView.as_view(), name='chapter-list-create'),
    path('chapters/<int:chapter_id>/sections/', SectionListCreateView.as_view(), name='section-list-create'),
    path('sections/<slug:slug>/', SectionDetailView.as_view(), name='section-detail'),
    path('chapters/<int:chapter_id>/practice-questions/', PracticeQuestionListCreateView.as_view(), name='practice-question-list-create'),
    path('practice-questions/<int:id>/', PracticeQuestionDetailView.as_view(), name='practice-question-detail'),
    path('tutorial-progress/<int:tutorial_id>/', TutorialProgressView.as_view(), name='tutorial-progress'),
]
