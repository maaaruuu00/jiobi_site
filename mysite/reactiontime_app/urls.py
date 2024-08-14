from django.urls import path
from reactiontime_app import views

urlpatterns = [
    path('', views.start, name='start'),
    path('start/', views.start, name='start'),
    path('play/', views.play, name='play'),
    path('end/', views.end, name='end'),
]
