document.addEventListener('DOMContentLoaded', function() {
    let memoryTime;
    let remainingTime;
    let currentShapes = []; // 현재 단계에서 표시되는 도형들의 정보 저장
    let totalScore = 0;
    const shapes = [...Array(16).keys()]; // 16개의 도형 번호
    let currentStep = 1;
    let draggedItem = null;
    let memoryInterval;
    let remainingInterval;
    let correctPlacements = 0; // 맞춘 도형의 수를 추적

    const staticURL = document.getElementById('static-url').value;

    function startGame() {
        resetGame();
        displayShapes();
    }

    function resetGame() {
        clearIntervals(); // 모든 이전 타이머를 초기화
        correctPlacements = 0; // 맞춘 도형의 수 초기화

        document.getElementById('game-over-message').style.display = 'none';
        document.getElementById('total-score').textContent = totalScore;
        const shapeCount = Math.floor((currentStep + 2) / 3); // 현재 단계에서 나타나는 도형 수
        memoryTime = shapeCount * 3; // 도형 수 * 3초
        remainingTime = shapeCount * 3; // 도형 수 * 3초

        document.getElementById('memory-time').textContent = memoryTime;
        document.getElementById('remaining-time').textContent = remainingTime;
        document.getElementById('remaining-time-container').style.display = 'none';
        document.getElementById('memory-time-container').style.display = 'block';

        // 상단 그리드를 초기화
        const topGridCells = document.querySelectorAll('#top-grid .grid-cell');
        topGridCells.forEach(cell => {
            cell.innerHTML = '';
            cell.removeAttribute('data-correct-shape');
            cell.removeAttribute('data-position');
        });

        // 하단 그리드를 초기화
        const bottomGridCells = document.querySelectorAll('#bottom-grid .grid-cell');
        bottomGridCells.forEach(cell => {
            cell.innerHTML = ''; // 하단 그리드의 모든 셀을 비웁니다.
        });

        // 하단 그리드에 모든 도형을 다시 추가
        shapes.forEach((shape, index) => {
            const cell = document.getElementById(`bottom-cell-${index}`);
            if (cell) {
                cell.innerHTML = `<img src="${staticURL}images/shape${shape}.png" alt="Shape ${shape}" class="draggable" id="shape-${shape}">`;
            }
        });

        countdownMemoryTime();
    }

    function displayShapes() {
        const positions = [];
        const usedShapes = []; // 사용된 도형을 추적하기 위한 배열
        currentShapes = [];
    
        // 단계에 따른 도형 개수만큼 반복
        for (let i = 0; i < Math.ceil(currentStep / 3); i++) {
            let randomPosition;
            let randomShape;
            
            // 중복되지 않는 위치를 선택
            do {
                randomPosition = Math.floor(Math.random() * 16);
            } while (positions.includes(randomPosition));
            positions.push(randomPosition);
    
            // 중복되지 않는 도형을 선택
            do {
                randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            } while (usedShapes.includes(randomShape));
            usedShapes.push(randomShape);
    
            currentShapes.push({ shape: randomShape, position: randomPosition });
    
            const topCell = document.getElementById(`top-cell-${randomPosition}`);
            topCell.dataset.correctShape = randomShape;
            topCell.dataset.position = randomPosition;
            topCell.innerHTML = `<img src="${staticURL}images/shape${randomShape}.png" alt="Shape" id="shape-${randomShape}">`;
    
            setTimeout(() => {
                topCell.innerHTML = '';
            }, memoryTime * 1000);
        }
    
        setTimeout(() => {
            startDragAndDrop();
        }, memoryTime * 1000);
    }

    function countdownMemoryTime() {
        clearIntervals(); // 이전 타이머 초기화
        memoryInterval = setInterval(() => {
            memoryTime--;
            document.getElementById('memory-time').textContent = memoryTime;
            if (memoryTime <= 0) {
                clearInterval(memoryInterval);
                startDragAndDrop(); // 시간이 종료되면 드래그 앤 드롭을 시작
            }
        }, 1000);
    }

    function startDragAndDrop() {
        clearIntervals(); // 남은 시간 타이머를 시작하기 전에 기존 타이머 초기화
        document.getElementById('memory-time-container').style.display = 'none';
        document.getElementById('remaining-time-container').style.display = 'block';

        const draggableItems = document.querySelectorAll('.draggable img');
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('touchstart', handleTouchStart);
            item.addEventListener('touchmove', handleTouchMove);
            item.addEventListener('touchend', handleTouchEnd);
        });

        const topGridCells = document.querySelectorAll('#top-grid .grid-cell');
        topGridCells.forEach(cell => {
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('drop', handleDrop);
        });

        startRemainingTime(); // 드래그 앤 드롭이 시작되면 남은 시간 타이머 시작
    }

    function handleDragStart(e) {
        draggedItem = this;  // 드래그된 아이템을 추적합니다.
        e.dataTransfer.setData('text/plain', draggedItem.id); // 아이템의 ID를 데이터로 설정
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            draggedItem.style.display = 'none'; // 드래그된 아이템을 보이지 않게 설정
        }, 0);
    }

    function handleDragEnd(e) {
        setTimeout(() => {
            if (draggedItem) {
                draggedItem.style.display = 'block'; // 드래그가 끝나면 아이템을 다시 보이게 설정
                draggedItem = null; // 드래그가 끝났으므로 null로 초기화
            }
        }, 0);
    }

    function handleTouchStart(e) {
        draggedItem = this;
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touchLocation = e.targetTouches[0];
        draggedItem.style.left = `${touchLocation.pageX}px`;
        draggedItem.style.top = `${touchLocation.pageY}px`;
    }

    function handleTouchEnd(e) {
        const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (dropTarget && dropTarget.classList.contains('grid-cell')) {
            dropTarget.appendChild(draggedItem);
            checkPlacement(dropTarget, draggedItem.id);
        }
        draggedItem.style.display = 'block';
        draggedItem = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedItemId = e.dataTransfer.getData('text/plain');
        if (droppedItemId) {
            const droppedElement = document.getElementById(droppedItemId);
            if (droppedElement) {
                this.appendChild(droppedElement); // 타겟 셀에 드래그된 아이템을 추가
                droppedElement.style.display = 'block'; // 드롭된 후 아이템을 보이게 설정
                checkPlacement(this, droppedItemId); // 위치 및 도형 확인
            }
        }
    }

    function checkPlacement(target, droppedItemId) {
        const droppedShape = parseInt(droppedItemId.split('-')[1]);
        const targetPosition = parseInt(target.id.split('-')[2]);
    
        const correctShape = parseInt(target.dataset.correctShape);
        const correctPosition = parseInt(target.dataset.position);
    
        console.log('droppedShape:', droppedShape);
        console.log('targetPosition:', targetPosition);
        console.log('correctShape:', correctShape);
        console.log('correctPosition:', correctPosition);
    
        if (droppedShape === correctShape && targetPosition === correctPosition) {
            correctPlacements++; // 맞춘 도형 수 증가
            totalScore++; // 도형이 맞을 때마다 점수 추가
            document.getElementById('total-score').textContent = totalScore;
    
            if (correctPlacements === currentShapes.length) {
                // "정답입니다." 메시지 표시
                showCorrectMessage();
            }
        } else {
            target.style.border = '2px solid red'; // 오답 위치 강조
            gameOver();
        }
    }
    

    function showCorrectMessage() {
        clearIntervals(); // 타이머 중지
        const correctMessage = document.createElement('div');
        correctMessage.textContent = "정답입니다.";
        correctMessage.style.position = 'absolute';
        correctMessage.style.top = '50%';
        correctMessage.style.left = '50%';
        correctMessage.style.transform = 'translate(-50%, -50%)';
        correctMessage.style.fontSize = '24px'; // 메시지 크기 증가
        correctMessage.style.backgroundColor = 'white';
        correctMessage.style.padding = '20px';
        correctMessage.style.border = '2px solid black';
        correctMessage.style.zIndex = '1000';
    
        const gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.parentNode.insertBefore(correctMessage, gameOverMessage);
    
        setTimeout(() => {
            correctMessage.remove(); // 1초 후 메시지 제거
            nextStep(); // 다음 단계로 이동
        }, 1000);
    }

    function startRemainingTime() {
        clearIntervals(); // 이전 타이머 초기화
        remainingInterval = setInterval(() => {
            remainingTime--;
            document.getElementById('remaining-time').textContent = remainingTime;
    
            if (remainingTime <= 0) {
                clearInterval(remainingInterval);
                remainingTime = 0;
                document.getElementById('remaining-time').textContent = remainingTime;
                gameOver('timeout'); // 시간이 초과되었을 때 'timeout' 이유로 게임 종료
            }
        }, 1000);
    }

    function nextStep() {
        currentStep++;
        if (currentStep <= 16) {
            clearIntervals(); // 단계가 변경될 때마다 타이머 초기화
            resetGame();
            displayShapes();
        } else {
            gameOver();
        }
    }

    function gameOver(reason) {
        clearIntervals();
    
        if (reason === 'timeout') {
            showTimeoutMessage();
        } else {
            showGameOverMessage();
        }
    
        const draggableItems = document.querySelectorAll('.draggable img');
        draggableItems.forEach(item => {
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragend', handleDragEnd);
            item.removeEventListener('touchstart', handleTouchStart);
            item.removeEventListener('touchmove', handleTouchMove);
            item.removeEventListener('touchend', handleTouchEnd);
        });
    
        const topGridCells = document.querySelectorAll('#top-grid .grid-cell');
        topGridCells.forEach(cell => {
            cell.removeEventListener('dragover', handleDragOver);
            cell.removeEventListener('drop', handleDrop);
        });
    
        // 하단 그리드에 정답 표시 및 정답이 아닌 이미지 숨기기
        const bottomGridCells = document.querySelectorAll('#bottom-grid .grid-cell');
        bottomGridCells.forEach(cell => {
            const correctShape = currentShapes.find(shapeObj => shapeObj.position == cell.id.split('-')[2]);
            if (correctShape) {
                cell.innerHTML = `<img src="${staticURL}images/shape${correctShape.shape}.png" alt="Correct Shape" style="border: 2px solid green;">`;
            } else {
                cell.innerHTML = ''; // 정답이 아닌 셀을 비웁니다.
            }
        });
    }
    

    document.getElementById('restart-button').addEventListener('click', function() {
        totalScore = 0;
        currentStep = 1;
        correctPlacements = 0; // 맞춘 도형 수 초기화
    
        clearIntervals(); // 타이머를 초기화하여 게임 종료 시 시간이 계속 흐르는 문제를 방지
    
        // 상단 그리드를 초기화
        const topGridCells = document.querySelectorAll('#top-grid .grid-cell');
        topGridCells.forEach(cell => {
            cell.innerHTML = ''; // 상단 그리드의 모든 셀을 비웁니다.
            cell.removeAttribute('data-correct-shape');
            cell.removeAttribute('data-position');
            cell.style.border = ''; // 빨간색 테두리 초기화
        });
    
        // 하단 그리드를 초기화
        const bottomGridCells = document.querySelectorAll('#bottom-grid .grid-cell');
        bottomGridCells.forEach(cell => {
            cell.innerHTML = ''; // 하단 그리드의 모든 셀을 비웁니다.
        });
    
        // 하단 그리드에 모든 도형을 다시 추가
        shapes.forEach((shape, index) => {
            const cell = document.getElementById(`bottom-cell-${index}`);
            if (cell) {
                cell.innerHTML = `<img src="${staticURL}images/shape${shape}.png" alt="Shape ${shape}" class="draggable" id="shape-${shape}">`;
            }
        });
    
        startGame(); // 게임을 처음 상태로 다시 시작합니다.
    });
    

    function clearIntervals() {
        clearInterval(memoryInterval);
        clearInterval(remainingInterval);
    }

    function showTimeoutMessage() {
        const timeoutMessage = document.createElement('div');
        timeoutMessage.textContent = "시간이 초과되었습니다.";
        timeoutMessage.style.position = 'fixed';
        timeoutMessage.style.top = '50%';
        timeoutMessage.style.left = '50%';
        timeoutMessage.style.transform = 'translate(-50%, -50%)';
        timeoutMessage.style.backgroundColor = 'white';
        timeoutMessage.style.padding = '20px';
        timeoutMessage.style.border = '2px solid black';
        timeoutMessage.style.zIndex = '1000';
        timeoutMessage.style.fontSize = '24px';
    
        document.body.appendChild(timeoutMessage);
    
        setTimeout(() => {
            timeoutMessage.remove();
            showGameOverMessage(); // 1초 후 "게임이 끝났어요" 메시지 표시
        }, 1000);
    }

    function showGameOverMessage() {
        document.getElementById('game-over-message').style.display = 'block';
    }

    startGame();
});
