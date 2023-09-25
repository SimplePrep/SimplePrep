from django.contrib import admin # noqa
from . import models

admin.site.register(models.BlogPost)
admin.site.register(models.Tag)
