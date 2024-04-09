from django.contrib import admin
from django.contrib.auth import get_user_model
from typing import Any
from django.db.models.fields.related import ForeignKey, ManyToManyField
from django.db.models.query import QuerySet
from django.http import HttpRequest

User = get_user_model()
class UserAdmin(admin.ModelAdmin):

    list_display = ('id', 'first_name', 'last_name', 'email',)
    list_display_links = ('id', 'first_name', 'last_name', 'email', )
    search_fields = ('first_name', 'last_name', 'email', )
    list_per_page = 25

    
    def delete_model(self, request, obj):
        email = obj.email
        obj.delete()
        
admin.site.register(User, UserAdmin)