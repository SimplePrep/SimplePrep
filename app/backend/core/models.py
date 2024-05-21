from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Test(models.Model):
    """
        Model fort Test
    """
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title

class TestModel(models.Model):
    
    """
        Model for Test Modules
    """
    test = models.ForeignKey(Test, on_delete = models.CASCADE, related_name = 'testmodel' , null=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    num_questions = models.IntegerField(default=27)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.title
    

class Question(models.Model):
    """
        Model for Questions
    """
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
    correct_answer = models.CharField(max_length=1, choices=[('A', 'Option A'), ('B', 'Option B'), ('C', 'Option C'), ('D', 'Option D')])
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add = True)

class Comment(models.Model):
    """
        Model for Comments
    """
    User = get_user_model()
    test = models.ForeignKey(TestModel, on_delete=models.CASCADE, related_name = 'comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'comments')
    text = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now= True)
    def __str__(self):
        return f"Comment by {self.user.username} on {self.test.name}"

class TestResult(models.Model):
    """
        Model for retrieving results for previous test attempts
    """
    test_model = models.ForeignKey(TestModel, on_delete=models.CASCADE, related_name='test_results')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name ='test_results')
    score = models.IntegerField(default=0, help_text="User's score for this test attempt.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f"{self.test.title} - {self.user.name}"

class UserAnswer(models.Model):
    test_result = models.ForeignKey(TestResult, on_delete=models.CASCADE, related_name='user_answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='user_answers')
    selected_option = models.CharField(max_length=1, choices=[('A', 'Option A'), ('B', 'Option B'), ('C', 'Option C'), ('D', 'Option D')])

    class Meta:
        unique_together = ('test_result', 'question')

    def __str__(self):
        return f"{self.test_result.test_model.title} - {self.question.query} - Selected Option: {self.selected_option}"
