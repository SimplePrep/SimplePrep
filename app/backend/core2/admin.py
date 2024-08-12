from django.contrib import admin
from spa.admin import admin_site
from .models import Tutorial, Chapter, Section, PracticeQuestion

class TutorialAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')

class ChapterAdmin(admin.ModelAdmin):
    list_display = ('tutorial', 'title', 'order', 'description', 'lessons', 'practices', 'difficulty', 'img_path', 'required_subscription')
    list_filter = ('tutorial', )

class SectionAdmin(admin.ModelAdmin):
    list_display = ('chapter', 'title', 'slug', 'order')
    list_filter = ('chapter', )

class PracticeQuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'chapter', 'title', 'correct_answer', 'likes', 'dislikes', 'created_at')
    list_filter = ('chapter', 'correct_answer')
    search_fields = ('title', 'context', 'query')

admin_site.register(Tutorial, TutorialAdmin)
admin_site.register(Chapter, ChapterAdmin)
admin_site.register(Section, SectionAdmin)
admin_site.register(PracticeQuestion, PracticeQuestionAdmin)
