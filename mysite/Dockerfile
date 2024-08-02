# Python 이미지를 기반으로 설정
FROM python:3.9

# 작업 디렉토리 설정
WORKDIR /app

# 요구사항 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 프로젝트 파일 복사
COPY . .

# 정적 파일 수집
RUN python manage.py collectstatic --noinput

# WSGI 서버 실행
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "mysite.wsgi:application"]
