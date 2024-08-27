// flashtrack.js

// 게임 상태 변수
let sequence = [];  // 올바른 시퀀스를 저장
let playerSequence = [];  // 플레이어가 입력한 시퀀스를 저장
let score = 0;  // 현재 점수
let activeButtons = 3;  // 초기 활성화된 버튼 수

// 게임 초기화
document.addEventListener("DOMContentLoaded", function() {
    startNewGame();
    
    // 각 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".game-button").forEach(button => {
        button.addEventListener("click", handleButtonClick);
        button.addEventListener("touchstart", handleButtonClick);
    });

    // 다시 하기 버튼 이벤트 리스너 추가
    document.getElementById("restart-btn").addEventListener("click", startNewGame);
    document.getElementById("exit-btn").addEventListener("click", exitGame);
});

// 새로운 게임 시작
function startNewGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    activeButtons = 3;
    document.getElementById("score").innerText = score;
    document.getElementById("message-box").classList.add("hidden");
    generateSequence();
}

// 시퀀스 생성
function generateSequence() {
    for (let i = 0; i < activeButtons; i++) {
        sequence.push(Math.floor(Math.random() * activeButtons) + 1);
    }
    playSequence();
}

// 시퀀스 재생
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const buttonId = `btn-${sequence[i]}`;
        const button = document.getElementById(buttonId);
        flashButton(button);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 500);
}

// 버튼 깜빡임
function flashButton(button) {
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 300);
}

// 버튼 클릭 또는 터치 처리
function handleButtonClick(event) {
    const buttonId = event.target.id;
    const buttonNumber = parseInt(buttonId.split("-")[1]);
    playerSequence.push(buttonNumber);
    checkPlayerInput();
}

// 플레이어 입력 검증
function checkPlayerInput() {
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        endGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score += calculateScore();
        document.getElementById("score").innerText = score;
        if (playerSequence.length === activeButtons) {
            playerSequence = [];
            activeButtons++;
            if (activeButtons > 8) {
                showEndMessage("게임에 성공하셨습니다. 축하합니다. 당신의 최종 점수는 " + score + "점입니다.");
            } else {
                generateSequence();
            }
        }
    }
}

// 점수 계산
function calculateScore() {
    const timeTaken = performance.now() - startTime;
    const baseScore = activeButtons * 50;  // 기본 점수
    const timeBonus = Math.max(0, (1000 - timeTaken) / 10);  // 시간 보너스 (시간이 적을수록 보너스가 큼)
    return Math.round(baseScore + timeBonus);
}

// 게임 종료
function endGame() {
    showEndMessage("게임이 끝났습니다. 최종 점수: " + score + "점");
}

// 게임 종료 메시지 표시
function showEndMessage(message) {
    document.getElementById("message-text").innerText = message;
    document.getElementById("message-box").classList.remove("hidden");
}

// 게임 종료 처리
function exitGame() {
    var exitUrl = document.getElementById("exit-link").href;
    window.location.href = exitUrl;  // 동적으로 생성된 URL로 리디렉션
}

