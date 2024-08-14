from django.shortcuts import render

# 시작 화면을 렌더링하는 뷰
def start(request):
    return render(request, 'game/start.html')

# 게임 화면을 렌더링하는 뷰
def play(request):
    return render(request, 'game/play.html')

# 게임 종료 화면을 렌더링하는 뷰
def end(request):
    score = request.GET.get('score', 0)
    return render(request, 'game/end.html', {'score': score})
