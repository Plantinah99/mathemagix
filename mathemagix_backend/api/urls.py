from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, QuestionViewSet, CompetitionViewSet, UserScoreViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'competitions', CompetitionViewSet)
router.register(r'scores', UserScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('leaderboard/', leaderboard, name='leaderboard'),

]
