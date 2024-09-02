# oxquiz/views.py

from django.shortcuts import render

def oxquiz(request):
    return render(request, 'oxquiz.html')
