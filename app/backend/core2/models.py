from django.db import models

class Tutorial(models.Model):
    """
        Model for Tutorial Modules (english, writing, math)
    """

    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title
    
class Chapter(models.Model):
    """
    Model for chapters in Tutorial Modules
    """
    tutorial = models.ForeignKey(Tutorial, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.tutorial.title} -> {self.title}"
    
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
    
class PracticeQuestion(models.Model):
    """
    Model for practice questions in each chapter
    """
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='practice_questions')
    title = models.CharField(max_length=255)
    context = models.TextField(blank=False, null=False)
    query = models.TextField(blank=False, null=False)
    graph_img = models.ImageField(blank=True, null=True, upload_to='question_graphs/')
    option_A = models.TextField(blank=False, null=False)
    option_B = models.TextField(blank=False, null=False)
    option_C = models.TextField(blank=False, null=False)
    option_D = models.TextField(blank=False, null=False)
    explanation = models.TextField(default='', blank=True)
    correct_answer = models.CharField(max_length=1, choices=[('A', 'Option A'), ('B', 'Option B'), ('C', 'Option C'), ('D', 'Option D')])
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"Question for {self.chapter.title}"

