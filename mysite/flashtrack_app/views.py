# flashtrack_app/views.py

from django.shortcuts import render

def flashtrack_view(request):
    return render(request, 'flashtrack.html')  # flashtrack.html 템플릿을 렌더링
