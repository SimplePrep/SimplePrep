from django.db import models
from django.utils.timesince import timesince
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager,
    PermissionsMixin,
)
import datetime
# Create your models here.

class BlogPost(models.Model):
    """BlogPost object."""


    title = models.CharField(max_length=200)
    description = models.TextField()
    pub_date = models.DateTimeField("Date published")
    reading_time = models.PositiveIntegerField(help_text="Estimated reading time (minutes)")
    
    content = models.TextField()
    tags=  models.ManyToManyField('Tag')
    def __str__(self) -> str:
        current_date = datetime.datetime.now()
        if self.pub_date.year == current_date.year:
            pub_date = self.pub_date.strftime("%b %d")
        else:
            pub_date = self.pub_date.strftime("%b %d, %Y")
        return f"{self.title} || {pub_date}"
    
    
class Tag(models.Model):
    """Tag for filtering BlogPosts."""
    name = models.CharField(max_length=255)
    

    def __str__(self):
        return self.name
