from django.contrib import admin
from spa.admin import admin_site
from .models import Tutorial, Section

class TutorialAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')

class SectionAdmin(admin.ModelAdmin):
    list_display = ('module', 'title', 'slug')
    list_filter = ('module', )


admin_site.register(Tutorial, TutorialAdmin)
admin_site.register(Section, SectionAdmin)