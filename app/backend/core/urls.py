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
    path('test-modules/<int:test_id>/', ManageTestModuleView.as_view(), name='manage-test-modules'),
    path('questions/<int:test_module_id>/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('comments/<int:test_module_id>/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('test-results/<int:user_id>/', TestResultCreateView.as_view(), name='test-result-list-create'),
    path('user-answers/<int:test_result_id>/', UserAnswerView.as_view(), name='user-answer-list-create')
]
