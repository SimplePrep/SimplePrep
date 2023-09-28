from django.contrib import admin # noqa
from . import models as core_models

admin.site.register(core_models.BlogPost)
admin.site.register(core_models.Tag)

"""
Django admin customization
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from users import models as users_models

class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users."""
    list_filter = []
    ordering = ['id']
    list_display = ['email', 'name', 'is_subscribed']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_subscribed',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)})
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'name',
                'is_subscribed',
                'is_staff',
                'is_superuser',
            )
        }),
    )


admin.site.register(users_models.User, UserAdmin)