from django.shortcuts import render
import logging

logger = logging.getLogger(__name__)

def index(request):
    logger.debug("NumberSequence_app index view called")
    return render(request, 'numbersequence.html')
