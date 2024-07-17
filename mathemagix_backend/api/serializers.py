from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Question, Competition, UserScore

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'difficulty']

class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ['id', 'name', 'start_time', 'end_time']

class UserScoreSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    competition = CompetitionSerializer(read_only=True)

    class Meta:
        model = UserScore
        fields = ['id', 'user', 'competition', 'score']
