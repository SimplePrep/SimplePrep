from django.contrib import admin
from .models import TestModel, Question, Comment, TestResult, UserAnswer
# Register your models here.

admin.site.register(TestModel)
admin.site.register(Question)
admin.site.register(Comment)
admin.site.register(TestResult)
admin.site.register(UserAnswer)