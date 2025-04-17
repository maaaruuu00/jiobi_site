from django.http import HttpResponse, JsonResponse, FileResponse
from django.shortcuts import render
import whisper
import os
import librosa
import uuid  # 고유 ID 생성용
import torch
from pyannote.audio import Pipeline
from gtts import gTTS
from dotenv import load_dotenv  # 추가

# TF32 활성화 (GPU 성능 향상)
torch.backends.cuda.matmul.allow_tf32 = True
torch.backends.cudnn.allow_tf32 = True

# GPU 장치 설정
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"사용 중인 장치: {device}")

# Whisper 모델 로드 함수 (필요 시 로드 및 해제)
# Whisper 모델을 전역으로 로드 (서버 시작 시 한 번만 실행)
model = whisper.load_model("large-v3")

load_dotenv()  # .env 파일 로드
# Pyannote-Audio 모델 로드 함수 (필요 시 로드 및 해제)
def load_diarize_model():
    diarize_model = Pipeline.from_pretrained(
        "pyannote/speaker-diarization-3.0",  # 더 작은 모델 사용
        use_auth_token=os.getenv("use_auth_token")
    )
    diarize_model.to(torch.device(device))
    diarize_model._segmentation.min_duration_on = 0.05
    diarize_model._segmentation.min_duration_off = 0.05
    return diarize_model

# 초를 HH:MM:SS 형식으로 변환하는 함수
def format_timestamp(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

# Create your views here.
def main(request):
    return render(request, 'main.html')

def clock(request):
    return render(request, 'clock.html')

def calendar(request):
    return render(request, 'calendar.html')

def exchange_rate(request):
    return render(request, 'exchange_rate.html')

def heartrate(request):
    return render(request, 'heartrate.html')

def calculator(request):
    return render(request, 'calculator.html')

def myip(request):
    return render(request, 'myip.html')

def bmi_calculator(request):
    return render(request, 'bmi_calculator.html')

def blog(request):
    return render(request, 'blog.html')

def doryang(request):
    return render(request, 'doryang.html')

def game(request):
    return render(request, 'game.html')

def base(request):
    return render(request, 'base.html')

def basetest(request):
    return render(request, 'basetest.html')

def Ads(request):
    return HttpResponse("google.com, pub-6857449583126977, DIRECT, f08c47fec0942fa0", content_type='text/plain')

# 오디오 길이 가져오기
def get_audio_duration(request):
    if request.method == 'POST' and 'audio' in request.FILES:
        audio_file = request.FILES['audio']
        file_path = "temp_audio.wav"
        try:
            with open(file_path, "wb") as f:
                f.write(audio_file.read())
            if os.path.getsize(file_path) == 0:
                return JsonResponse({'error': '업로드된 오디오 파일이 비어 있습니다.'}, status=400)
            duration = librosa.get_duration(path=file_path)
            return JsonResponse({'duration': duration})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)
    return JsonResponse({'error': '잘못된 요청입니다.'}, status=400)

# STT 변환
def stt(request):
    if request.method == 'POST' and 'audio' in request.FILES:
        audio_file = request.FILES['audio']
        file_path = "temp_audio.wav"
        unique_id = str(uuid.uuid4())[:8]  # 고유 ID 생성
        txt_filename = f"transcription_{unique_id}.txt"
        txt_path = os.path.join("static", "transcriptions", txt_filename)
        try:
            with open(file_path, "wb") as f:
                f.write(audio_file.read())
            if os.path.getsize(file_path) == 0:
                return JsonResponse({'error': '업로드된 오디오 파일이 비어 있습니다.'}, status=400)
            result = model.transcribe(file_path, language="ko")
            segments = [
                {
                    'timestamp': f"[{format_timestamp(segment['start'])} - {format_timestamp(segment['end'])}]",
                    'text': segment['text']
                }
                for segment in result["segments"]
            ]
            # .txt 파일로 저장
            os.makedirs(os.path.dirname(txt_path), exist_ok=True)
            with open(txt_path, "w", encoding="utf-8") as txt_file:
                for segment in segments:
                    txt_file.write(f"{segment['timestamp']} {segment['text']}\n")
            return JsonResponse({'segments': segments, 'txt_file': txt_filename})  # 파일명만 반환
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)
    return render(request, 'stt.html', {'segments': None})

# 텍스트 파일 다운로드
def download_txt(request, filename):
    file_path = os.path.join("static", "transcriptions", filename)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            response = FileResponse(f, as_attachment=True, filename=filename)
            return response
    return HttpResponse("파일을 찾을 수 없습니다.", status=404)

def tts(request):
    if request.method == 'POST':
        text = request.POST.get('text', '').strip()
        if not text:
            return JsonResponse({'error': '텍스트가 비어 있습니다.'}, status=400)

        filename = f"tts_{uuid.uuid4().hex[:8]}.mp3"
        filepath = os.path.join("static", "audio", filename)

        try:
            tts = gTTS(text=text, lang='ko')
            tts.save(filepath)
            return JsonResponse({'audio_url': f'/static/audio/{filename}'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return render(request, 'tts.html')