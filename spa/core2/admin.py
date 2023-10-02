from django.contrib import admin
from .models import (
    Test,
    TestSection,
    Question,
    Topic,
    TestQuestion,
    Subject,
)
# Register your models here.
admin.site.register(Subject)
admin.site.register(Test)
admin.site.register(TestSection)
admin.site.register(Question)
admin.site.register(Topic)
admin.site.register(TestQuestion)