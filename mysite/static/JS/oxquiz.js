let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;
let isRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();

    document.getElementById("restart-btn").addEventListener("click", startNewGame);
    document.getElementById("exit-btn").addEventListener("click", exitGame);

    showStartMessage();
});

function fetchQuestions() {
    fetch('/static/txt/quiz_questions.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n');
            for (let i = 0; i < lines.length; i += 2) {
                const questionLine = lines[i].trim();
                const answerLine = lines[i + 1].trim();

                const questionIndex = questionLine.split(':')[0].trim();
                const questionText = questionLine.split(':')[1].trim();

                const answerIndex = answerLine.split(':')[0].trim();
                const answerText = answerLine.split(':')[1].trim().toUpperCase();

                if (questionIndex.replace('Q', '') === answerIndex.replace('A', '')) {
                    questions.push({
                        index: questionIndex.replace('Q', ''),
                        question: questionText,
                        answer: answerText === 'O'
                    });
                }
            }
        });
}

function showStartMessage() {
    const startMessage = document.createElement('p');
    startMessage.textContent = "게임 시작!";
    startMessage.style.fontSize = "32px";
    startMessage.style.fontWeight = "bold";
    startMessage.style.textAlign = "center";
    document.body.appendChild(startMessage);

    setTimeout(() => {
        startMessage.remove();
        startQuiz();
    }, 1000);
}

function startQuiz() {
    if (isRunning) return;
    isRunning = true;

    score = 0;
    timeLeft = 60;
    currentQuestionIndex = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('time-left').textContent = timeLeft;
    document.getElementById('time-left').style.color = '#4CAF50';

    document.getElementById('true-btn').disabled = false;
    document.getElementById('false-btn').disabled = false;

    shuffleQuestions();
    showNextQuestion();
    timer = setInterval(updateTimer, 1000);
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById('question-text').textContent = questions[currentQuestionIndex].question;
    } else {
        endQuiz();
    }
}

function answer(isTrue) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (isTrue === correctAnswer) {
        score += 10;
        document.getElementById('score').textContent = score;
        currentQuestionIndex++;
        setTimeout(showNextQuestion, 500);
    } else {
        endQuiz(false, correctAnswer);
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;

    if (timeLeft <= 20) {
        document.getElementById('time-left').style.color = '#F44336'; // 시간이 적어지면 빨간색으로 변경
    } else if (timeLeft <= 40) {
        document.getElementById('time-left').style.color = '#FF9800'; // 중간 시간일 때 주황색
    }

    if (timeLeft <= 0) {
        endQuiz();
    }
}

function endQuiz(isCorrect = true, correctAnswer = null) {
    clearInterval(timer);
    isRunning = false;

    if (!isCorrect && correctAnswer !== null) {
        document.getElementById('question-text').textContent = `게임 종료! 정답은 ${correctAnswer ? 'O' : 'X'}였습니다. 최종 점수: ${score}점.`;
    } else {
        document.getElementById('question-text').textContent = `게임 종료! 최종 점수: ${score}점.`;
    }

    document.getElementById('true-btn').disabled = true;
    document.getElementById('false-btn').disabled = true;

    showEndMessage();
}


function showEndMessage() {
    document.getElementById('message-box').classList.remove('hidden');
}

function startNewGame() {
    document.getElementById('message-box').classList.add('hidden');
    showStartMessage();
}

function exitGame() {
    document.getElementById('exit-link').click();
}
