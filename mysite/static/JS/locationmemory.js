document.addEventListener('DOMContentLoaded', function() {
    let memoryTime;
    let remainingTime;
    let currentShapeIndex;
    let totalScore = 0;
    const shapes = [...Array(16).keys()]; // 16개의 도형 번호
    let currentStep = 1;

    function startGame() {
        resetGame();
        displayShape();
    }

    function resetGame() {
        document.getElementById('game-over-message').style.display = 'none';
        document.getElementById('total-score').textContent = totalScore;
        currentShapeIndex = 0;
        memoryTime = currentStep * 2;
        remainingTime = currentStep * 3;
        document.getElementById('memory-time').textContent = memoryTime;
        document.getElementById('remaining-time-container').style.display = 'none';
        document.getElementById('memory-time-container').style.display = 'block';
        countdownMemoryTime();
    }

    function displayShape() {
        const randomPosition = Math.floor(Math.random() * 16);
        const randomShape = shapes[currentShapeIndex];
        const topCell = document.getElementById(`top-cell-${randomPosition}`);
        topCell.innerHTML = `<img src="/static/images/shape${randomShape}.png" alt="Shape">`;

        setTimeout(() => {
            topCell.innerHTML = '';
        }, memoryTime * 1000);
    }

    function countdownMemoryTime() {
        const memoryInterval = setInterval(() => {
            memoryTime--;
            document.getElementById('memory-time').textContent = memoryTime;
            if (memoryTime <= 0) {
                clearInterval(memoryInterval);
                startDragAndDrop();
            }
        }, 1000);
    }

    function startDragAndDrop() {
        document.getElementById('memory-time-container').style.display = 'none';
        document.getElementById('remaining-time-container').style.display = 'block';
        const topGrid = document.getElementById('top-grid');
        const draggableItems = document.querySelectorAll('.draggable img');

        draggableItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
            item.addEventListener('touchstart', handleTouchStart);
            item.addEventListener('touchmove', handleTouchMove);
            item.addEventListener('touchend', handleTouchEnd);
        });

        topGrid.addEventListener('dragover', handleDragOver);
        topGrid.addEventListener('drop', handleDrop);
        topGrid.addEventListener('touchmove', handleTouchMove);
        topGrid.addEventListener('touchend', handleDrop);

        startRemainingTime();
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function handleDragEnd(e) {
        e.preventDefault();
    }

    function handleTouchStart(e) {
        e.preventDefault();
        this.dragged = e.target;
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touchLocation = e.targetTouches[0];
        this.dragged.style.left = `${touchLocation.pageX}px`;
        this.dragged.style.top = `${touchLocation.pageY}px`;
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (dropTarget.classList.contains('grid-cell')) {
            dropTarget.appendChild(this.dragged);
            checkPlacement(dropTarget, this.dragged.id);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedItemId = e.dataTransfer.getData('text/plain');
        const droppedElement = document.getElementById(droppedItemId);
        e.target.appendChild(droppedElement);

        checkPlacement(e.target, droppedItemId);
    }

    function checkPlacement(target, droppedItemId) {
        const correctPosition = parseInt(droppedItemId.split('-')[2]);
        const targetPosition = parseInt(target.id.split('-')[2]);

        if (correctPosition === targetPosition) {
            totalScore++;
            document.getElementById('total-score').textContent = totalScore;
            nextStep();
        } else {
            gameOver();
        }
    }

    function startRemainingTime() {
        const remainingInterval = setInterval(() => {
            remainingTime--;
            document.getElementById('remaining-time').textContent = remainingTime;
            if (remainingTime <= 0) {
                clearInterval(remainingInterval);
                gameOver();
            }
        }, 1000);
    }

    function nextStep() {
        currentStep++;
        if (currentStep <= 16) {
            resetGame();
            displayShape();
        } else {
            gameOver();
        }
    }

    function gameOver() {
        document.getElementById('game-over-message').style.display = 'block';
        const draggableItems = document.querySelectorAll('.draggable img');
        draggableItems.forEach(item => {
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragend', handleDragEnd);
            item.removeEventListener('touchstart', handleTouchStart);
            item.removeEventListener('touchmove', handleTouchMove);
            item.removeEventListener('touchend', handleTouchEnd);
        });

        const topGrid = document.getElementById('top-grid');
        topGrid.removeEventListener('dragover', handleDragOver);
        topGrid.removeEventListener('drop', handleDrop);
        topGrid.removeEventListener('touchmove', handleTouchMove);
        topGrid.removeEventListener('touchend', handleDrop);
    }

    document.getElementById('restart-button').addEventListener('click', function() {
        totalScore = 0;
        currentStep = 1;
        startGame();
    });

    startGame();
});
