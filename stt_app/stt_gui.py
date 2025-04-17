import whisper
import os
import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext
from datetime import datetime
import sys
import torch
from pyannote.audio import Pipeline
from dotenv import load_dotenv

load_dotenv()
# TQDM_DISABLE 환경 변수 설정 - tqdm 진행 바 비활성화
os.environ["TQDM_DISABLE"] = "1"

# Whisper 모델 설정
device = "cuda" if torch.cuda.is_available() else "cpu"
print("Whisper 모델 로드 중 (large-v3)...")
model = whisper.load_model("large-v3", device=device)
print("모델 로드 완료")

# Hugging Face 토큰 설정
HF_TOKEN = os.getenv("HF_TOKEN")

# Pyannote-Audio 다이어리제이션 모델 로드
print("Pyannote-Audio 다이어리제이션 모델 로드 중...")
diarize_model = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token=HF_TOKEN
)
diarize_model.to(torch.device(device))

# 다이어리제이션 파라미터 설정
diarize_model._segmentation.min_duration_on = 0.1  # 최소 발화 지속 시간
diarize_model._segmentation.min_duration_off = 0.1  # 최소 침묵 지속 시간
print("다이어리제이션 모델 로드 완료")

def format_timestamp(seconds):
    """초를 HH:MM:SS 형식으로 변환"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

def transcribe_audio(audio_path, output_dir="transcriptions"):
    """오디오 파일을 STT로 변환하여 텍스트 파일로 저장하고 segments 반환"""
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_filename = f"transcription_{timestamp}.txt"
    output_path = os.path.join(output_dir, output_filename)

    try:
        print(f"오디오 변환 중: {audio_path}")
        # 1. Whisper로 초기 변환
        result = model.transcribe(audio_path, language="ko")
        segments = result["segments"]

        # 2. Pyannote-Audio로 화자 구분 (num_speakers 전달)
        diarization = diarize_model(audio_path, num_speakers=2)

        # 3. Whisper segments와 화자 구분 매핑
        formatted_segments = []
        for segment in segments:
            start = segment["start"]
            end = segment["end"]
            text = segment["text"]
            mid_point = (start + end) / 2  # 발화 구간의 중간 지점

            # 가장 가까운 화자 구간 찾기
            speaker = "알 수 없음"
            min_distance = float("inf")
            for turn, _, speaker_id in diarization.itertracks(yield_label=True):
                turn_mid = (turn.start + turn.end) / 2
                distance = abs(turn_mid - mid_point)
                if distance < min_distance:
                    min_distance = distance
                    speaker = f"SPEAKER_{speaker_id}"
                # 추가 조건: 발화 구간과 화자 구간이 겹치는 경우
                if (turn.start <= start <= turn.end) or (turn.start <= end <= turn.end) or (start <= turn.start <= end):
                    speaker = f"SPEAKER_{speaker_id}"
                    break

            formatted_segment = {
                'speaker': speaker,
                'timestamp': f"[{format_timestamp(start)} - {format_timestamp(end)}]",
                'text': text
            }
            formatted_segments.append(formatted_segment)

        # 텍스트 파일로 저장
        with open(output_path, "w", encoding="utf-8") as txt_file:
            for segment in formatted_segments:
                txt_file.write(f"{segment['speaker']} {segment['timestamp']} {segment['text']}\n")

        return formatted_segments, output_path  # segments와 파일 경로 반환
    except Exception as e:
        print(f"에러: {str(e)}")
        return f"에러: {str(e)}", None

class STTApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Whisper STT 프로그램")
        self.root.geometry("600x400")

        # UI 구성
        self.label = tk.Label(root, text="변환할 오디오 파일을 선택하세요:")
        self.label.pack(pady=5)

        self.select_button = tk.Button(root, text="오디오 파일 선택", command=self.select_file)
        self.select_button.pack(pady=5)

        self.transcribe_button = tk.Button(root, text="변환", command=self.transcribe, state=tk.DISABLED)
        self.transcribe_button.pack(pady=5)

        self.status_label = tk.Label(root, text="")
        self.status_label.pack(pady=5)

        # 변환 결과 표시용 Text 위젯과 스크롤바
        self.result_frame = tk.Frame(root)
        self.result_frame.pack(pady=5, fill=tk.BOTH, expand=True)

        self.result_text = scrolledtext.ScrolledText(self.result_frame, height=10, width=70, wrap=tk.WORD)
        self.result_text.pack(pady=5, padx=5, fill=tk.BOTH, expand=True)
        self.result_text.config(state=tk.DISABLED)  # 읽기 전용

        self.audio_path = None

    def select_file(self):
        self.audio_path = filedialog.askopenfilename(
            title="오디오 파일 선택",
            filetypes=[("오디오 파일", "*.wav *.mp3 *.m4a *.flac")]
        )
        if self.audio_path:
            self.status_label.config(text=f"선택됨: {os.path.basename(self.audio_path)}")
            self.transcribe_button.config(state=tk.NORMAL)
        else:
            self.status_label.config(text="파일이 선택되지 않았습니다")
            self.transcribe_button.config(state=tk.DISABLED)

    def transcribe(self):
        if not self.audio_path:
            messagebox.showerror("에러", "먼저 오디오 파일을 선택해주세요.")
            return

        self.status_label.config(text="변환 중...")
        self.result_text.config(state=tk.NORMAL)
        self.result_text.delete(1.0, tk.END)  # 이전 결과 지우기
        self.result_text.config(state=tk.DISABLED)
        self.root.update()

        segments, output_path = transcribe_audio(self.audio_path)
        if isinstance(segments, str) and segments.startswith("에러"):
            messagebox.showerror("에러", segments)
            self.status_label.config(text="변환 실패")
        else:
            # 변환 결과 표시
            self.result_text.config(state=tk.NORMAL)
            for segment in segments:
                self.result_text.insert(tk.END, f"{segment['speaker']} {segment['timestamp']} {segment['text']}\n")
            self.result_text.config(state=tk.DISABLED)
            messagebox.showinfo("성공", f"변환 결과가 저장되었습니다: {output_path}")
            self.status_label.config(text="변환 완료")

if __name__ == "__main__":
    root = tk.Tk()
    app = STTApp(root)
    root.mainloop()