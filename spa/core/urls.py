from django.urls import path
from .views import (
    ManageTestView, 
    QuestionListCreateView,
    CommentListCreateView,
    TestResultCreateView,
    UserAnswerView
)

urlpatterns = [
    path('tests/', ManageTestView.as_view(), name='test-list-create'),
    path('questions/<int:test_id>/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('comments/<int:test_id>/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('test-results/<int:user_id>/', TestResultCreateView.as_view(), name='test-result-list-create'),
    path('user-answers/<int:test_result_id>/', UserAnswerView.as_view(), name='user-answer-list-create')
]
