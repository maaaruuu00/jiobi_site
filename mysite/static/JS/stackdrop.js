let timeLeft = 60; // 남은 시간
let score = 0; // 현재 점수
let highScore = 0; // 최고 점수
let intervalId; // 좌우 이동을 위한 interval
let timerId; // 게임 시간을 위한 interval
let dropButton = document.getElementById("drop-button"); // "쌓기" 버튼을 가져옵니다.
let fallingRectangle = document.getElementById("falling-rectangle"); // 현재 상단에서 움직이는 블럭을 가져옵니다.
let stackedRectangles = document.getElementById("stacked-rectangles"); // 하단에 쌓일 블럭들을 저장할 영역을 가져옵니다.
const gameArea = document.getElementById("game-area");
const gameAreaWidth = gameArea.offsetWidth; // 동적으로 게임 영역의 너비 계산
const gameAreaHeight = gameArea.offsetHeight; // 동적으로 게임 영역의 높이 계산

const blockWidth = 80; // 블럭의 너비를 설정합니다.
const blockHeight = 30; // 블럭의 높이를 설정합니다.
const maxStackedBlocks = 3; // 최대 쌓일 블럭 수
const topOffset = gameAreaHeight * 0.003; // 높이에 따라 동적으로 topOffset 설정 (예: 높이의 0.3%)

/* 표준 종료 메시지 박스 js 시작 */
// 표준 종료 메시지 표시 함수
function showStandardEndMessage(score, exitUrl = "#") {
  const messageBox = document.getElementById("standard-message-box");
  const restartBtn = document.getElementById("standard-restart-btn");
  const exitBtn = document.getElementById("standard-exit-btn");
  const exitLink = document.getElementById("standard-exit-link");

  // 게임 영역 내에서 메시지 박스가 중앙에 위치하도록 설정
  const gameArea = document.getElementById("game-area");
  messageBox.style.position = "absolute"; // game-area 기준
  messageBox.style.top = "50%";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translate(-50%, -50%)";

  // DOM 요소가 모두 존재하는지 확인
  if (!messageBox || !restartBtn || !exitBtn || !exitLink) {
    console.error("필수 DOM 요소가 누락되었습니다.");
    return; // 필수 요소가 없으면 함수 실행 중단
  }

  // 게임 종료 메시지와 점수 표시를 위한 <p> 요소 생성
  const messageTextElement = document.createElement("p");
  messageTextElement.textContent = `게임이 끝났습니다.`;

  const scoreTextElement = document.createElement("p");
  scoreTextElement.textContent = `최종 점수는 ${score}점입니다.`;

  // 버튼들을 감싸는 컨테이너 추가
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";
  buttonContainer.appendChild(restartBtn);
  buttonContainer.appendChild(exitBtn);

  // 메시지와 점수 요소를 messageBox에 추가
  messageBox.innerHTML = ""; // 기존 내용 제거
  messageBox.appendChild(messageTextElement); // 종료 메시지 추가
  messageBox.appendChild(scoreTextElement); // 점수 메시지 추가
  messageBox.appendChild(buttonContainer); // 버튼 컨테이너 추가

  // 메시지 박스 화면에 표시
  messageBox.classList.remove("hidden");
  messageBox.style.display = "block"; // 박스를 화면에 표시

  // 다시 하기 버튼 클릭 이벤트 설정 (페이지 새로 고침으로 재시작)
  restartBtn.onclick = function () {
    location.reload(); // 페이지 새로 고침으로 게임 재시작
  };

  // 종료 버튼 클릭 이벤트 설정 (game.html으로 이동)
  exitBtn.onclick = function () {
    exitLink.click(); // 링크 클릭으로 이동
  };
}
/* 표준 종료 메시지 박스 js 종료 */

// 상단 블럭을 좌우로 이동
let movingRight = true; // 오른쪽으로 이동 중인지 여부
const moveSpeed = 5; // 블럭이 이동하는 속도
const centerPosition = gameAreaWidth / 2; // 게임 화면의 중앙
// 게임 영역의 중앙 위치와 블럭의 좌우 이동 범위 계산
const maxLeft = 0; // 왼쪽 끝 (게임 화면 왼쪽 경계)
const maxRight = gameAreaWidth - blockWidth; // 오른쪽 끝 (게임 화면 오른쪽 경계)

// 남은 시간 업데이트 함수
function updateTimer() {
  timeLeft--;
  document.getElementById("time-left").textContent = `남은 시간: ${timeLeft}초`;

  if (timeLeft <= 0) {
    endGame(); // 시간이 0이 되면 게임 종료
  }
}

// 게임 영역의 크기에 맞춰 최대 좌우 이동 범위를 동적으로 설정
function updateMoveBoundaries() {
  const gameAreaWidth = gameArea.offsetWidth; // 게임 영역의 너비를 동적으로 가져옴
  const maxLeft = 0; // 왼쪽 끝
  const maxRight = gameAreaWidth - blockWidth; // 오른쪽 끝 (블럭 전체 너비만큼 빼기)
  return { maxLeft, maxRight };
}

// 상단 블럭의 좌우 이동
function moveRectangle() {
  // fallingRectangle이 존재하는지 먼저 확인
  if (fallingRectangle) {
    const { maxLeft, maxRight } = updateMoveBoundaries(); // 동적으로 좌우 경계를 가져옴
    const currentLeft = parseInt(fallingRectangle.style.left, 10); // 현재 사각형의 왼쪽 위치

    if (movingRight) {
      // 사각형이 오른쪽 끝에 닿지 않았다면 이동
      if (currentLeft < maxRight) {
        fallingRectangle.style.left = `${currentLeft + moveSpeed}px`; // 오른쪽으로 이동
      } else {
        movingRight = false; // 오른쪽 끝에 닿으면 왼쪽으로 이동
      }
    } else {
      // 사각형이 왼쪽 끝에 닿지 않았다면 이동
      if (currentLeft > maxLeft) {
        fallingRectangle.style.left = `${currentLeft - moveSpeed}px`; // 왼쪽으로 이동
      } else {
        movingRight = true; // 왼쪽 끝에 닿으면 오른쪽으로 이동
      }
    }
  }
}

setInterval(moveRectangle, 50); // 50ms마다 블럭을 이동

function dropRectangle() {
  // 현재 블럭의 왼쪽 위치를 계산합니다.
  const currentLeft = parseInt(fallingRectangle.style.left, 10);

  if (stackedRectangles.children.length > 0) {
    const lastBlock =
      stackedRectangles.children[stackedRectangles.children.length - 1];
    const lastBlockLeft = parseInt(lastBlock.style.left, 10);

    // 실패 조건 확인
    checkFailCondition(currentLeft, lastBlockLeft);

    // 보너스 점수 계산
    calculateScore(currentLeft, lastBlockLeft);
  } else {
    score += 10; // 첫 블럭은 기본 점수만
    document.getElementById(
      "current-score"
    ).textContent = `현재 점수: ${score}점`;
  }

  // 하단에 쌓인 블럭의 개수를 확인합니다.
  const stackedCount = stackedRectangles.children.length;

  // 하단에 쌓일 위치를 계산하고, 오차(topOffset)를 반영하여 정확하게 쌓습니다.
  fallingRectangle.style.top = `${
    gameAreaHeight - (stackedCount + 1) * blockHeight - topOffset
  }px`; // 하단에 쌓기

  // 현재 블럭을 하단에 추가합니다 (stackedRectangles에 추가).
  stackedRectangles.appendChild(fallingRectangle);

  // 만약 3개 이상의 블럭이 쌓였다면
  if (stackedRectangles.children.length > 3) {
    // 맨 아래의  블럭을 제거
    stackedRectangles.removeChild(stackedRectangles.firstElementChild);

    // 남은 블럭들을 아래로 한 칸씩 이동
    for (let i = 0; i < stackedRectangles.children.length; i++) {
      // i = 1로 변경, 첫 번째 블럭 제외
      const block = stackedRectangles.children[i];
      const currentTop = parseInt(block.style.top, 10);
      block.style.top = `${currentTop + blockHeight}px`; // 한 칸씩 아래로 이동
    }
  }

  // 상단에 새 블럭을 생성하여 원래 위치에 다시 설정합니다.
  createNewFallingRectangle(currentLeft);
}

// 새로운 블럭을 상단 중앙에 생성하는 함수
function createNewFallingRectangle(leftPosition) {
  // 새로운 블럭을 생성하고, 기본 스타일과 위치를 설정합니다.
  fallingRectangle = document.createElement("div");
  fallingRectangle.className = "falling-rectangle"; // 블럭에 'falling-rectangle' 클래스 적용
  fallingRectangle.style.width = `${blockWidth}px`; // 블럭의 너비 설정
  fallingRectangle.style.height = `${blockHeight}px`; // 블럭의 높이 설정
  fallingRectangle.style.backgroundColor = "#3498db"; // 블럭의 색상 설정
  fallingRectangle.style.position = "absolute"; // 블럭의 위치 속성을 절대 위치로 설정
  fallingRectangle.style.top = "0px"; // 상단에서 시작하도록 위치 설정
  fallingRectangle.style.left = `${leftPosition}px`; // 이전 위치에 새 블럭을 생성
  document.getElementById("game-area").appendChild(fallingRectangle); // game-area에 블럭을 추가
}

// 게임 시작 시 좌우 이동 시작
function startGame() {
  createNewFallingRectangle(gameAreaWidth / 2 - blockWidth / 2); // 상단 중앙에 첫 블럭 생성
  dropButton.disabled = false; // 쌓기 버튼 활성화
  intervalId = setInterval(moveRectangle, 50); // 50ms마다 블럭을 이동
  timerId = setInterval(updateTimer, 1000); // 1초마다 시간 감소

  // 게임 시작 시 종료 메시지 박스를 숨깁니다.
  document.getElementById("standard-message-box").classList.add("hidden");

  // 최고 점수 불러오기
  const savedHighScore = localStorage.getItem("highScore");
  if (savedHighScore) {
    highScore = parseInt(savedHighScore, 10);
    document.getElementById(
      "high-score"
    ).textContent = `최고 점수: ${highScore}점`;
  }
}

// 게임 시작
// 페이지 로드 시 게임 시작
window.onload = function () {
  startGame();
};

// "쌓기" 버튼을 클릭할 때 dropRectangle 함수 실행
dropButton.addEventListener("click", dropRectangle);

// 게임 종료 함수
function endGame() {
  clearInterval(intervalId); // 블럭 이동 중지
  clearInterval(timerId); // 타이머 중지
  dropButton.disabled = true; // 쌓기 버튼 비활성화

  showStandardEndMessage(score, "/game.html");

  // 최고 점수 갱신
  if (score > highScore) {
    highScore = score;
    document.getElementById(
      "high-score"
    ).textContent = `최고 점수: ${highScore}점`;
    localStorage.setItem("highScore", highScore); // 로컬 저장소에 저장
  }

  // 초기화 후 재시작 가능
  score = 0;
  timeLeft = 60;
  document.getElementById(
    "current-score"
  ).textContent = `현재 점수: ${score}점`;
}

// 점수 계산 함수 (블럭 위치가 일치할 때 보너스 점수 계산)
function calculateScore(currentLeft, lastBlockLeft) {
  const difference = Math.abs(currentLeft - lastBlockLeft);
  const overlapPercentage = ((blockWidth - difference) / blockWidth) * 100;
  const bonusScore = Math.round((overlapPercentage / 100) * 10); // 보너스 점수 계산
  score += 10 + bonusScore; // 기본 점수 10점 + 보너스 점수
  document.getElementById(
    "current-score"
  ).textContent = `현재 점수: ${score}점`;
}

// 블럭이 실패 조건을 만족하는지 확인하는 함수
function checkFailCondition(currentLeft, lastBlockLeft) {
  const difference = Math.abs(currentLeft - lastBlockLeft);
  if (difference > blockWidth / 2) {
    // 블럭이 50% 이상 벗어나면 실패
    fallingRectangle.style.transition =
      "top 0.5s ease-out, transform 0.5s ease-out";
    fallingRectangle.style.transform =
      currentLeft < lastBlockLeft ? "rotate(-45deg)" : "rotate(45deg)";
    fallingRectangle.style.top = `${gameAreaHeight}px`; // 게임 화면 아래로 떨어지게 설정
    setTimeout(endGame, 500); // 500ms 후 게임 종료
  }
}
