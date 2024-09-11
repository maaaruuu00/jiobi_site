// 게임 상태 변수
let sequence = [];  // 올바른 시퀀스를 저장
let playerSequence = [];  // 플레이어가 입력한 시퀀스를 저장
let score = 0;  // 현재 점수
let activeButtons = 3;  // 초기 활성화된 버튼 수
let startTime;  // 시퀀스 시작 시간
let currentRound = 0;  // 현재 라운드 번호
const colors = ["#FF6347", "#FFA500", "#FFFF00", "#008000", "#00FFFF", "#0000FF", "#800080", "#FFC0CB"];
let buttonMapping = [];  // 버튼 ID와 색상 매핑

let b = activeButtons;  // 현재 시퀀스의 길이 (a 값과 동일하게 시작)
let c = 1;  // 현재 게임 단계

let flashtrackhighScore = 0; // 최고 점수 변수

// 게임 초기화
document.addEventListener("DOMContentLoaded", function() {
    startNewGame();
    
    // 각 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".quarter-button").forEach(button => {
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
    b = activeButtons;  // 시퀀스 길이 초기화
    c = 1;  // 라운드를 1로 초기화
    buttonMapping = [];  // 매핑 초기화
    loadHighScore();
    document.getElementById("score").innerText = score;
    document.getElementById("message-box").classList.add("hidden");
    
    // 버튼 색상 매핑 및 초기화
    setupButtonColors();

    showStageMessage(c);  // 첫 라운드 메시지 표시
    setTimeout(generateSequence, 1000); // 1초 후에 첫 시퀀스 시작
}

// 버튼 색상 매핑 및 초기화
function setupButtonColors() {
    const buttons = document.querySelectorAll('.quarter-button');
    
    // 초기화: 모든 버튼을 흰색으로 비활성화
    buttons.forEach((button, index) => {
        button.style.backgroundColor = "#FFFFFF";
        button.classList.add('inactive');
        button.style.display = 'none';  // 비활성화된 버튼을 숨김 처리
    });

    // 고정된 색상을 버튼에 매핑
    const fixedColors = {
        'inner-btn-1': 'url("/static/images/flashtrack_3D_Blue.png")',
        'inner-btn-2': 'url("/static/images/flashtrack_3D_Cyan.png")',
        'inner-btn-3': 'url("/static/images/flashtrack_3D_Pink.png")',
        'inner-btn-4': 'url("/static/images/flashtrack_3D_Purple.png")',
        'outer-btn-1': 'url("/static/images/flashtrack_3D_Red.png")',
        'outer-btn-2': 'url("/static/images/flashtrack_3D_Orange.png")',
        'outer-btn-3': 'url("/static/images/flashtrack_3D_Green.png")',
        'outer-btn-4': 'url("/static/images/flashtrack_3D_Yellow.png")'
    };

    // 고정된 색상으로 버튼 배경 이미지 설정 및 표시
    Object.keys(fixedColors).forEach((buttonId, index) => {
        const button = document.getElementById(buttonId);
        if (index < activeButtons) {
            button.style.backgroundImage = fixedColors[buttonId];
            button.style.backgroundSize = 'cover';
            button.style.display = 'block';  // 활성화된 버튼만 표시
            button.classList.remove('inactive');
        }
    });


    // 이전 랜덤 색상 설정 부분 주석 처리
    /*
    // 사용될 색상 배열에서 활성화할 색상 선택 (중복 제거)
    let availableColors = [...colors];  // 색상 배열 복사
    const usedColors = [];

    for (let i = 0; i < activeButtons; i++) {
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const selectedColor = availableColors.splice(randomIndex, 1)[0];  // 사용한 색상 제거
        usedColors.push(selectedColor);
    }

    // 안쪽 버튼을 우선적으로 활성화
    for (let i = 0; i < activeButtons; i++) {
        let buttonId;
        if (i < 4) {
            buttonId = `inner-btn-${i + 1}`; // 안쪽 버튼 ID 설정
        } else {
            buttonId = `outer-btn-${i - 3}`; // 바깥쪽 버튼 ID 설정
        }
        
        const button = document.getElementById(buttonId);
        buttonMapping[i + 1] = usedColors[i];
        button.style.backgroundColor = usedColors[i];
        button.classList.remove('inactive');
    }
    */
}


// 시퀀스 생성
function generateSequence() {
    const numberOfFlashes = b;  // 현재 시퀀스 길이 b를 사용
    sequence = [];
    for (let i = 0; i < numberOfFlashes; i++) {
        sequence.push(Math.floor(Math.random() * activeButtons) + 1);
    }
    console.log("Generated sequence:", sequence);
    playSequence();
}


// 시퀀스 재생
function playSequence() {
    let i = 0;
    startTime = performance.now();
    const interval = setInterval(() => {
        const buttonId = sequence[i] <= 4 ? `inner-btn-${sequence[i]}` : `outer-btn-${sequence[i] - 4}`;
        const button = document.getElementById(buttonId);
        flashButton(button);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            playerSequence = [];  // 플레이어 입력 초기화
        }
    }, 500);  // 0.5초 간격으로 깜빡입니다.
}

// 버튼 깜빡임
function flashButton(button) {
    if (!button || button.classList.contains('inactive')) return;  // 비활성화된 버튼은 무시
    const originalBackground = button.style.backgroundImage;
    button.style.backgroundImage = "none"; // 배경을 없앰 (깜빡임 효과)
    setTimeout(() => {
        button.style.backgroundImage = originalBackground; // 원래 배경 복구
    }, 300);
}


// 버튼 클릭 또는 터치 처리
function handleButtonClick(event) {
    if (event.target.classList.contains('inactive')) return;  // 비활성화된 버튼은 무시
    const buttonId = event.target.id;
    const buttonNumber = buttonId.includes('inner-btn') ? parseInt(buttonId.split("-")[2]) : parseInt(buttonId.split("-")[2]) + 4;
    playerSequence.push(buttonNumber);

    // 버튼 눌리는 효과 추가
    const originalColor = event.target.style.backgroundColor;
    event.target.style.backgroundColor = "#DDDDDD";
    setTimeout(() => {
        event.target.style.backgroundColor = originalColor;
    }, 200);

    checkPlayerInput();
}

// 플레이어가 정답을 맞추고 다음 라운드로 넘어갈 때 단계 메시지 호출
function checkPlayerInput() {
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        endGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score += calculateScore();
        document.getElementById("score").innerText = score;

        b++;  // 시퀀스 길이 증가
        if (b > activeButtons * 2) {  // 시퀀스 길이가 버튼 수의 2배보다 크면
            activeButtons++;  // 활성화된 색상 수 증가
            b = activeButtons; // 시퀀스 길이를 새로운 활성화된 버튼 수로 초기화
            setupButtonColors();  // 새로운 색상 추가 및 배치
        }

        c++;  // 단계 증가
        showStageMessage(c);  // 단계 메시지 표시
        setTimeout(generateSequence, 1000);  // 1초 후에 시퀀스 생성 시작
    }
}



// 점수 계산 및 애니메이션 적용
function calculateScore() {
    const timeTaken = performance.now() - startTime;
    const baseScore = b * activeButtons * 10;  // 시퀀스 길이(b)와 활성화된 색상 수(activeButtons)를 고려한 기본 점수
    const timeBonus = Math.max(0, (1000 / timeTaken) * 50);  // 시간 보너스
    const newScore = Math.round(baseScore + timeBonus);

    // 점수 애니메이션 메시지 생성 (주석 처리하여 메시지를 표시하지 않음)
    /*
    const scoreMessage = document.createElement("div");
    scoreMessage.classList.add("score-message");
    scoreMessage.innerText = `기본 점수 : ${baseScore} + 보너스 점수 : ${Math.round(timeBonus)}`;

    // 메시지를 화면에 추가
    const gridElement = document.querySelector('.grid');
    gridElement.appendChild(scoreMessage);

    // 1초 후 메시지를 제거하고 점수를 업데이트
    setTimeout(() => {
        scoreMessage.remove();
    }, 1000);
    */

    // 점수 애니메이션 적용
    const scoreElement = document.getElementById("score");
    const currentScore = parseInt(scoreElement.innerText, 10);  // 현재 점수를 정수로 변환
    scoreElement.innerText = currentScore + newScore; // 점수 갱신
    scoreElement.style.animation = "scoreAnimation 0.5s ease-in-out";

    // 애니메이션 초기화 (다시 사용할 수 있게)
    scoreElement.addEventListener("animationend", function() {
        scoreElement.style.animation = "";
    });

    return newScore;
}




// 게임 종료
function endGame() {
    showEndMessage("게임이 끝났습니다. 최종 점수: " + score + "점");
    updateHighScore();
}

// 게임 종료 메시지 표시
function showEndMessage(message) {
    const messageBox = document.getElementById("message-box");
    messageBox.querySelector("#message-text").innerText = message; // 기존 메시지에 텍스트 변경
    document.querySelector('.grid').appendChild(messageBox);  // 메시지 박스를 게임 화면 중앙으로 이동
    messageBox.classList.remove("hidden");
}

// 게임 종료 처리
function exitGame() {
    var exitUrl = document.getElementById("exit-link").href;
    window.location.href = exitUrl;  // 동적으로 생성된 URL로 리디렉션
}

// 단계 메시지 표시
function showStageMessage(stage) {
    const stageMessage = document.createElement("div");
    stageMessage.classList.add("stage-message");
    stageMessage.innerText = `단계 ${stage}`;

    // 메시지를 화면에 추가
    const gridElement = document.querySelector('.grid');
    gridElement.appendChild(stageMessage);

    // 1초 후 메시지를 제거
    setTimeout(() => {
        stageMessage.remove();
    }, 1000);
}

// 최고 점수 로드 함수
function loadHighScore() {
    const savedHighScore = localStorage.getItem("flashtrackhighScore");
    if (savedHighScore) {
        flashtrackhighScore = parseInt(savedHighScore, 10);
        document.getElementById("high-score").textContent = `최고 점수: ${flashtrackhighScore}점`;
    }
    }
    
    // 최고 점수 업데이트 함수
    function updateHighScore() {
    if (score > flashtrackhighScore) {
        flashtrackhighScore = score;
        document.getElementById("high-score").textContent = `최고 점수: ${flashtrackhighScore}점`;
        localStorage.setItem("flashtrackhighScore", flashtrackhighScore); // 로컬 저장소에 저장
    }
    }