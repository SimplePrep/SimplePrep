from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Test(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

class TestModel(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='testmodel', null=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    num_questions = models.IntegerField(default=27)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    test = models.ForeignKey(TestModel, on_delete=models.CASCADE, related_name='questions')
    model = models.CharField(max_length=255)
    section = models.CharField(max_length=255)
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
    created_at = models.DateTimeField(auto_now_add=True)

class TestResult(models.Model):
    test_model = models.ForeignKey(TestModel, on_delete=models.CASCADE, related_name='test_results', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='test_results')
    score = models.IntegerField(default=0, help_text="User's score for this test attempt.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.test_model.title} - {self.user.first_name}"

class UserAnswer(models.Model):
    test_result = models.ForeignKey(TestResult, on_delete=models.CASCADE, related_name='user_answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='user_answers')
    selected_option = models.CharField(max_length=1, choices=[('A', 'Option A'), ('B', 'Option B'), ('C', 'Option C'), ('D', 'Option D')])

    class Meta:
        unique_together = ('test_result', 'question')

    def __str__(self):
        return f"{self.test_result.test_model.title} - {self.question.query} - Selected Option: {self.selected_option}"

class TestReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    test_result = models.OneToOneField(TestResult, on_delete=models.CASCADE, related_name='report')
    report_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    temp_val = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f"Report for {self.test_result.test_model.title} - {self.test_result.user.first_name}"

class Post(models.Model):
    test_module = models.ForeignKey(TestModel, on_delete=models.CASCADE, related_name='posts')
    title = models.TextField(blank=False, null=False)
    content = models.TextField(blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    author_uid = models.CharField(max_length=128)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Reply(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='replies')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='replies')
    author_uid = models.CharField(max_length=128)
    content = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reply by {self.author.get_full_name} on {self.post.title}"
