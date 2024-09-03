let timeLeft = 60;
let score = 0;
let intervalId;
let movingRight = true;
const moveSpeed = 10; // 사각형 이동 속도 (ms 단위)
const maxStackedBlocks = 3;
let stackedBlocks = [];
const gameAreaWidth = 600; // 사각형이 움직일 수 있는 총 거리
const blockWidth = 80;
const blockHeight = 30;
let dropButton = document.getElementById('drop-button');
let fallingRectangle = document.getElementById('falling-rectangle');
let stackedRectangles = document.getElementById('stacked-rectangles');
let blockIndex = 0; // 블록 인덱스를 관리하는 변수

// 초기 위치 설정
fallingRectangle.style.left = `${(gameAreaWidth / 2) - (blockWidth / 2)}px`;
fallingRectangle.style.top = `0px`; // 초기 top 위치

function startGame() {
    intervalId = setInterval(moveRectangle, moveSpeed);
    updateTimer();
}

function moveRectangle() {
    const currentLeft = parseInt(fallingRectangle.style.left, 10);
    if (movingRight) {
        if (currentLeft < gameAreaWidth - blockWidth) {
            fallingRectangle.style.left = `${currentLeft + 5}px`;
        } else {
            movingRight = false;
        }
    } else {
        if (currentLeft > 0) {
            fallingRectangle.style.left = `${currentLeft - 5}px`;
        } else {
            movingRight = true;
        }
    }
}

function dropRectangle() {
    clearInterval(intervalId); // 사각형이 떨어지기 전에 이동 중지

    const currentLeft = parseInt(fallingRectangle.style.left, 10);
    const dropDistance = stackedBlocks.length * blockHeight;

    // 떨어지는 애니메이션 추가
    fallingRectangle.style.transition = "top 0.5s ease-out";
    fallingRectangle.style.top = `${660 - (dropDistance + blockHeight)}px`; // bottom으로 떨어지도록 설정

    setTimeout(() => {
        // 충돌 판정
        if (stackedBlocks.length > 0) {
            const lastBlock = stackedBlocks[stackedBlocks.length - 1];
            const lastBlockLeft = lastBlock.left;

            // 현재 블록의 왼쪽 끝과 오른쪽 끝 계산
            const currentBlockLeft = currentLeft;
            const currentBlockRight = currentLeft + blockWidth;

            // 이전 블록의 왼쪽 끝과 오른쪽 끝 계산
            const lastBlockRight = lastBlockLeft + blockWidth;

            // 겹치는 부분 계산
            const overlapLeft = Math.max(currentBlockLeft, lastBlockLeft);
            const overlapRight = Math.min(currentBlockRight, lastBlockRight);
            const overlapWidth = overlapRight - overlapLeft;

            if (overlapWidth <= blockWidth / 2) {
                // 반 이상 걸쳐지지 않으면 사각형을 아래로 떨어뜨리면서 게임 종료
                fallingRectangle.style.transition = "top 0.5s ease-out, transform 0.5s ease-out";
                
                // 사각형이 왼쪽으로 떨어지는 경우
                if (currentBlockRight <= lastBlockLeft + (blockWidth / 2)) {
                    fallingRectangle.style.transform = `rotate(-45deg)`; // 왼쪽으로 회전
                } 
                // 사각형이 오른쪽으로 떨어지는 경우
                else if (currentBlockLeft >= lastBlockRight - (blockWidth / 2)) {
                    fallingRectangle.style.transform = `rotate(45deg)`; // 오른쪽으로 회전
                }
                
                fallingRectangle.style.top = `660px`; // 게임 영역 밖으로 떨어지도록 설정
                setTimeout(endGame, 500); // 애니메이션이 끝난 후 게임 종료
                return;
            } else {
                score += 10 + Math.floor((overlapWidth / blockWidth) * 10); // 정확하게 쌓인 정도에 따라 점수 추가
            }
        } else {
            score += 10; // 첫 번째 사각형은 기본 점수만 추가
        }

        // 새로운 사각형을 쌓기
        const newBlock = {
            left: currentLeft,
            element: fallingRectangle.cloneNode(true),
            index: blockIndex++ // 각 블록에 인덱스를 부여
        };
        stackedBlocks.push(newBlock);
        stackedRectangles.appendChild(newBlock.element);

        // 최대 3개의 블록만 유지하도록 처리
        if (stackedBlocks.length > maxStackedBlocks) {
            // 첫 번째 블록 제거
            const removedBlock = stackedBlocks.shift();
            if (removedBlock && removedBlock.element) {
                removedBlock.element.remove(); // DOM에서 요소 제거
            }

            // 남은 블록들이 올바르게 이동되도록 위치를 재계산
            stackedBlocks.forEach((block, index) => {
                block.element.style.transition = "top 0.3s ease-out";
                block.element.style.top = `${660 - ((index + 1) * blockHeight)}px`; // 여기서 index는 0부터 시작하므로 +1을 추가
            });
        }

        document.getElementById('score').textContent = `Score: ${score}`;

        // 새로운 사각형 생성
        resetFallingRectangle(currentLeft); // 같은 위치에서 새 사각형 생성
        intervalId = setInterval(moveRectangle, moveSpeed);
    }, 500); // 애니메이션이 끝난 후 실행되도록 500ms 대기
}

function resetFallingRectangle(initialLeft) {
    fallingRectangle = document.createElement('div');
    fallingRectangle.id = 'falling-rectangle';
    fallingRectangle.style.width = `${blockWidth}px`;
    fallingRectangle.style.height = `${blockHeight}px`;
    fallingRectangle.style.backgroundColor = '#3498db';
    fallingRectangle.style.position = 'absolute';
    fallingRectangle.style.top = '0px'; // top에서 새롭게 시작
    fallingRectangle.style.left = `${initialLeft}px`; // 이전 위치에서 시작
    document.getElementById('game-area').appendChild(fallingRectangle);
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
        endGame();
    } else {
        setTimeout(updateTimer, 1000);
    }
}

function endGame() {
    clearInterval(intervalId);

    // 게임 종료 메시지 표시
    const messageBox = document.getElementById('message-box');
    messageBox.classList.remove('hidden');
    document.getElementById('message-text').textContent = `게임이 끝났습니다. 총 ${score}점을 획득하셨습니다.`;

    // 다시 하기 버튼 설정
    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload(); // 페이지 새로고침하여 게임 재시작
    });

    // 종료 버튼 설정
    document.getElementById('exit-btn').addEventListener('click', () => {
        document.getElementById('exit-link').click(); // 숨겨진 링크를 클릭하여 종료
    });

    // 디버깅 로그 추가
    console.log("endGame 함수가 호출되었습니다.");
}

// 이벤트 리스너 설정
dropButton.addEventListener('click', dropRectangle);

// 게임 시작
startGame();
