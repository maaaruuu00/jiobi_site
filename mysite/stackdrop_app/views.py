# stackdrop_app/views.py

from django.shortcuts import render

def stackdrop_view(request):
    return render(request, 'stackdrop.html')  # stackdrop.html 템플릿을 렌더링
