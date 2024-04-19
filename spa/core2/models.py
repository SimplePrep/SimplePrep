from django.db import models

class Tutorial(models.Model):
    """
        Model for Tutorial Modules (english, writing, math)
    """

    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title
class Section(models.Model):
    """
        Model for sections in Tutorial Module
    """
    module = models.ForeignKey(Tutorial, on_delete=models.CASCADE, related_name='sections')
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    content = models.TextField()

    def __str__(self) -> str:
        return f"{self.module.title} -> {self.title}"