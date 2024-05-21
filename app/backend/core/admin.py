from django.contrib import admin
from spa.admin import admin_site
from .models import Test, TestModel, Question, Comment, TestResult, UserAnswer

class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'updated_at')

class TestModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'num_questions', 'created_at', 'updated_at',)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('test', 'title', 'created_at', )
    list_filter = ('test', )

class CommentAdmin(admin.ModelAdmin):
    list_display = ('test', 'user', 'text', 'created_at',)
    list_filter = ('test', 'user',)

class TestResultAdmin(admin.ModelAdmin):
    list_display = ('test_model_title', 'user', 'score', 'created_at', 'updated_at')
    list_filter = ('test_model_title', 'user')

    def test_model_title(self, obj):
        return obj.test_model.title
    test_model_title.admin_order_field = 'test_model__title'  # Allows column order sorting
    test_model_title.short_description = 'Test Title'  # Renames column head

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('test_result', 'question', 'selected_option', )
    list_filter = ('test_result', 'question')

admin_site.register(Test, TestAdmin)
admin_site.register(TestModel, TestModelAdmin)
admin_site.register(Question, QuestionAdmin)
admin_site.register(Comment, CommentAdmin)
admin_site.register(TestResult, TestResultAdmin)
admin_site.register(UserAnswer, UserAnswerAdmin)