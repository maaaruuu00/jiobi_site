# flashtrack_app/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.flashtrack_view, name='flashtrack'),  # 게임 페이지를 위한 URL 패턴
]
