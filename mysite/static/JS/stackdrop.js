let dropButton = document.getElementById('drop-button'); // "쌓기" 버튼을 가져옵니다.
let fallingRectangle = document.getElementById('falling-rectangle'); // 현재 상단에서 움직이는 블럭을 가져옵니다.
let stackedRectangles = document.getElementById('stacked-rectangles'); // 하단에 쌓일 블럭들을 저장할 영역을 가져옵니다.
const gameArea = document.getElementById('game-area');
const gameAreaWidth = gameArea.offsetWidth;  // 동적으로 게임 영역의 너비 계산
const gameAreaHeight = gameArea.offsetHeight;  // 동적으로 게임 영역의 높이 계산

const blockWidth = 80; // 블럭의 너비를 설정합니다.
const blockHeight = 30; // 블럭의 높이를 설정합니다.
const topOffset = gameAreaHeight * 0.003; // 높이에 따라 동적으로 topOffset 설정 (예: 높이의 0.3%)

// 상단 블럭을 좌우로 이동
let movingRight = true; // 오른쪽으로 이동 중인지 여부
const moveSpeed = 5; // 블럭이 이동하는 속도
const centerPosition = gameAreaWidth / 2; // 게임 화면의 중앙
// 게임 영역의 중앙 위치와 블럭의 좌우 이동 범위 계산
const maxLeft = 0; // 왼쪽 끝 (게임 화면 왼쪽 경계)
const maxRight = gameAreaWidth - blockWidth; // 오른쪽 끝 (게임 화면 오른쪽 경계)



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

    // 하단에 쌓인 블럭의 개수를 확인합니다. 
    const stackedCount = stackedRectangles.children.length;

    // 하단에 쌓일 위치를 계산하고, 오차(topOffset)를 반영하여 정확하게 쌓습니다.
    fallingRectangle.style.top = `${gameAreaHeight - (stackedCount + 1) * blockHeight - topOffset}px`; // 하단에 쌓기

    
    // 현재 블럭을 하단에 추가합니다 (stackedRectangles에 추가).
    stackedRectangles.appendChild(fallingRectangle);

    // 만약 3개 이상의 블럭이 쌓였다면
    if(stackedRectangles.children.length > 3) {
        // 맨 아래의  블럭을 제거
        stackedRectangles.removeChild(stackedRectangles.firstElementChild);

        // 남은 블럭들을 아래로 한 칸씩 이동
        for (let i = 0; i < stackedRectangles.children.length; i++) { // i = 1로 변경, 첫 번째 블럭 제외
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
    fallingRectangle = document.createElement('div');
    fallingRectangle.className = 'falling-rectangle'; // 블럭에 'falling-rectangle' 클래스 적용
    fallingRectangle.style.width = `${blockWidth}px`; // 블럭의 너비 설정
    fallingRectangle.style.height = `${blockHeight}px`; // 블럭의 높이 설정
    fallingRectangle.style.backgroundColor = '#3498db'; // 블럭의 색상 설정
    fallingRectangle.style.position = 'absolute'; // 블럭의 위치 속성을 절대 위치로 설정
    fallingRectangle.style.top = '0px'; // 상단에서 시작하도록 위치 설정
    fallingRectangle.style.left = `${leftPosition}px`; // 이전 위치에 새 블럭을 생성
    document.getElementById('game-area').appendChild(fallingRectangle); // game-area에 블럭을 추가
}

// 게임 시작 시 좌우 이동 시작
function startGame() {
    createNewFallingRectangle(gameAreaWidth / 2 - blockWidth / 2); // 상단 중앙에 첫 블럭 생성
    intervalId = setInterval(moveRectangle, 50); // 50ms마다 블럭을 이동
}

// 게임 시작
// 페이지 로드 시 게임 시작
window.onload = function() {
    startGame();
};

// "쌓기" 버튼을 클릭할 때 dropRectangle 함수 실행
dropButton.addEventListener('click', dropRectangle);