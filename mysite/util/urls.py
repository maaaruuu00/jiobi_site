
from django.urls import path
from . import views


urlpatterns = [
    path('ads.txt',views.Ads),
    path('', views.main, name='main'),
    path('main', views.main, name='main'),
    path('clock', views.clock, name='clock'),
    path('calendar', views.calendar, name='calendar'),
    path('exchange_rate', views.exchange_rate, name='exchange_rate'),
    path('heartrate', views.heartrate, name='heartrate'),
    path('calculator', views.calculator, name='calculator'),
    path('myip', views.myip, name='myip'),
    path('base', views.base, name='base'),
    path('basetest', views.basetest, name='basetest'),
    path('bmi_calculator', views.bmi_calculator, name='bmi_calculator'),
    path('blog', views.blog, name='blog'),
    path('doryang', views.doryang, name='doryang'),

    path('game', views.game, name='game'),
    path('stt/', views.stt, name='stt'),
    path('get_audio_duration/', views.get_audio_duration, name='get_audio_duration'),  # 추가
    path('download_txt/<str:filename>', views.download_txt, name='download_txt'),  # 추가
    path('tts/', views.tts, name='tts'),

]