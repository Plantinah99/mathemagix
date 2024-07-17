from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    text = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)

    def __str__(self):
        return f"{self.text} ({self.difficulty})"

class Competition(models.Model):
    name = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    participants = models.ManyToManyField(User, through='UserScore')

    def __str__(self):
        return self.name

class UserScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'competition')

    def __str__(self):
        return f"{self.user.username} - {self.competition.name}: {self.score}"
