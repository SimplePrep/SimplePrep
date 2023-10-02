from django.urls import path, include
from .views import (
    SubjectViewSet,
    TopicViewSet,
    QuestionViewSet,
    SectionViewSet,
    TestViewSet,
    TestSectionQuestions,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('subjects', SubjectViewSet)
router.register('topics', TopicViewSet)
router.register('questions', QuestionViewSet)
router.register('sections', SectionViewSet)
router.register('tests', TestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('testsections/<int:testsection_pk>/questions/', TestSectionQuestions.as_view()),
]