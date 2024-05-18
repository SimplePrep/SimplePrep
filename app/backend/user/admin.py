from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib import messages
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from spa.admin import admin_site
User = get_user_model()
class UserAdmin(admin.ModelAdmin):

    list_display = ('id', 'first_name', 'last_name', 'email',)
    list_display_links = ('id', 'first_name', 'last_name', 'email', )
    search_fields = ('first_name', 'last_name', 'email', )
    ordering = ['email']
    list_per_page = 25
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name', 'firebase_uid')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    
    def delete_model(self, request, obj):
        OutstandingToken.objects.filter(user_id=obj.id).delete()
        user_email = obj.email  # Access the email attribute from the user object
        obj.delete()
        messages.success(request, f"The user with email {user_email} has been deleted successfully.")

    
    def get_form(self, request, obj=None, **kwargs):
        if obj and obj.firebase_uid:
            self.exclude = ('password',)
        else:
            self.exclude = None
        return super().get_form(request, obj, **kwargs)
        
admin_site.register(User, UserAdmin)