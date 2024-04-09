from django.contrib import admin
from .models import TestModel, Question, Comment, TestResult, UserAnswer

class TestModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'num_questions', 'created_at', 'updated_at',)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('test', 'title', 'created_at', )
    list_filter = ('test', )

class CommentAdmin(admin.ModelAdmin):
    list_display = ('test', 'user', 'text', 'created_at',)
    list_filter = ('test', 'user',)

class TestResultAdmin(admin.ModelAdmin):
    list_display = ('test', 'user', 'score', 'created_at', )
    list_filter = ('test', 'user', )

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('test_result', 'question', 'selected_option', )
    list_filter = ('test_result', 'question')

admin.site.register(TestModel, TestModelAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(TestResult, TestResultAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)