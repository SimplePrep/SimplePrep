from django.contrib import admin
from .models import Tutorial, Section

class TutorialAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')

class SectionAdmin(admin.ModelAdmin):
    list_display = ('module', 'title', 'slug')
    list_filter = ('module', )


admin.site.register(Tutorial, TutorialAdmin)
admin.site.register(Section, SectionAdmin)