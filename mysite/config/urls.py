"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

# game.html을 렌더링하는 뷰 함수 추가
def game_view(request):
    return render(request, 'game.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('util.urls')),
    path('memorytest_app/', include('memorytest_app.urls')),
    path('reactiontime_app/', include('reactiontime_app.urls')),
    path('locationmemory_app/', include('locationmemory_app.urls')),
    path('numbersequence/', include('numbersequence_app.urls')),
    path('flashtrack/', include('flashtrack_app.urls')),  # flashtrack_app URL 연결
    path('game/', game_view, name='game'),  # game.html로 연결되는 경로 추가
    path('oxquiz/', include('oxquiz.urls')),
]
