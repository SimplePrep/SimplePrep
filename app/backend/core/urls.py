from django.urls import path
from .views import (
    ManageTestModuleView, 
    QuestionListCreateView,
    CommentListCreateView,
    UserTestModulesView,
    UserTestModuleAnswersView,
    ManageTestView,
)

urlpatterns = [
    path('tests/', ManageTestView.as_view(), name='manage-tests'),
    path('test-modules/<int:test_id>/', ManageTestModuleView.as_view(), name='manage-test-modules'),
    path('questions/<int:test_module_id>/', QuestionListCreateView.as_view(), name='question-list-create'),
    path('comments/<int:test_module_id>/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('<str:user_uid>/test_modules/', UserTestModulesView.as_view(), name='user-test-modules'),
    path('<str:user_uid>/test_module/<int:test_module_id>/user_answers/', UserTestModuleAnswersView.as_view(), name='user-test-module-answers')
]
