from django.db import models 

class Subject(models.Model):
    """Model for subjects English or Math"""
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Topic(models.Model):
    """Model for topic based tests"""
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}"


class Question(models.Model):
    """Model for test questions"""
    name = models.CharField(max_length=100)
    context = models.TextField()
    query = models.TextField()
    options = models.JSONField()
    correct_index = models.IntegerField()
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.name}"


class Test(models.Model):
    """Model for full-length practice tests"""
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.name}"

class TestSection(models.Model):
    """Model for test sections - either english or math"""
    name = models.CharField(max_length=100)
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    num_questions = models.IntegerField()
    def __str__(self) -> str:
        return f"{self.test} | {self.name}"
    
class TestQuestion(models.Model):
    """Model for topic questions"""
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    testsection = models.ForeignKey(TestSection, on_delete=models.CASCADE)
    def __str__(self):
        return f"Topic Question for {self.question}"