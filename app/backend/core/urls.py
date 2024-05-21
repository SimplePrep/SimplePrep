from django.urls import path
from .views import (
    ManageTestModuleView, 
    QuestionListCreateView,
    CommentListCreateView,
    TestResultCreateView,
    UserAnswerView,
    ManageTestView,
)

urlpatterns = [
    path('tests/', ManageTestView.as_view(), name='manage-tests'),
    path('tests/<int:test_id>/modules/', ManageTestModuleView.as_view(), name='manage-test-modules'),
    path('modules/<int:test_module_id>/questions/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('modules/<int:test_module_id>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('users/<int:user_id>/test-results/', TestResultCreateView.as_view(), name='test-result-list-create'),
    path('test-results/<int:test_result_id>/user-answers/', UserAnswerView.as_view(), name='user-answer-list-create'),
]
