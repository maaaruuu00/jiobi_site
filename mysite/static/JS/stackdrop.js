let dropButton = document.getElementById('drop-button');
let fallingRectangle = document.getElementById('falling-rectangle');
let stackedRectangles = document.getElementById('stacked-rectangles'); // 하단에 블럭이 쌓일 영역
const gameAreaHeight = 660; // 게임 영역의 높이
const blockWidth = 80;
const blockHeight = 30;
const blockPadding = 0; // 블럭이 완전히 하단에 닿게 하기 위한 패딩

// "쌓기" 버튼을 누르면 상단 블럭을 하단으로 이동하고 같은 위치에 새로운 블럭 생성
function dropRectangle() {
    // 현재 블럭의 위치 계산
    const currentLeft = parseInt(fallingRectangle.style.left, 10);

    // 현재 블럭을 하단으로 이동 (블럭이 완전히 화면에 맞게)
    fallingRectangle.style.top = `${gameAreaHeight - (stackedRectangles.children.length + 1) * blockHeight}px`; // 하단에 쌓기

    // 새로운 블럭을 원래 상단에 있던 위치에 생성
    createNewFallingRectangle(currentLeft);
}

// 새로운 블럭을 원래 위치에 생성하는 함수
function createNewFallingRectangle(leftPosition) {
    // 새로운 블럭을 생성하고 원래의 위치에 설정
    fallingRectangle = document.createElement('div');
    fallingRectangle.className = 'falling-rectangle';
    fallingRectangle.style.width = `${blockWidth}px`;
    fallingRectangle.style.height = `${blockHeight}px`;
    fallingRectangle.style.backgroundColor = '#3498db';
    fallingRectangle.style.position = 'absolute';
    fallingRectangle.style.top = '0px'; // 상단에 위치
    fallingRectangle.style.left = `${leftPosition}px`; // 이전 블럭의 위치에 새로 생성
    document.getElementById('game-area').appendChild(fallingRectangle);
}

// "쌓기" 버튼 클릭 이벤트 리스너
dropButton.addEventListener('click', dropRectangle);
