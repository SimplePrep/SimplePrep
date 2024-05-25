from django.contrib import admin
from spa.admin import admin_site
from .models import Test, TestModel, Question, Comment, TestResult, UserAnswer, TestReport

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
    list_filter = ('test_model__title', 'user')

    def test_model_title(self, obj):
        return obj.test_model.title
    test_model_title.admin_order_field = 'test_model__title'  # Allows column order sorting
    test_model_title.short_description = 'Test Title'  # Renames column head

 
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('test_result', 'question', 'selected_option', )
    list_filter = ('test_result', 'question')

class TestReportAdmin(admin.ModelAdmin):
    list_display = ('test_result', 'created_at', 'updated_at')
    search_fields = ('test_result__user__username', 'test_result__test_model__title')
    readonly_fields = ('created_at', 'updated_at')

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
    
admin_site.register(Test, TestAdmin)
admin_site.register(TestModel, TestModelAdmin)
admin_site.register(Question, QuestionAdmin)
admin_site.register(Comment, CommentAdmin)
admin_site.register(TestResult, TestResultAdmin)
admin_site.register(UserAnswer, UserAnswerAdmin)
admin_site.register(TestReport, TestReportAdmin)