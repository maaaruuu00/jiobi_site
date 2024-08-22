let score = 0;
let time = 0;
let level = 2;  // 2x2 칸부터 시작

let sequence = [];
let userSequence = [];
let timerInterval;

function initGame() {
    // 게임이 다시 시작될 때 기존의 메시지와 버튼을 제거합니다.
    const existingMessage = document.querySelector('.game-over-container');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 안내 문구가 숨겨져 있을 경우 다시 표시합니다.
    const instruction = document.getElementById('game-instruction');
    if (instruction) {
        instruction.style.display = 'block';
    }

    score = 0;
    level = 2;  // 2x2 칸부터 시작
    updateScore();
    startLevel();
}

function startLevel() {
    userSequence = [];
    sequence = generateSequence(level);
    createBoard(level);
    startTimer(level * level + 2);  // 각 레벨에 맞는 시간 설정
}

function generateSequence(level) {
    const numbers = [];
    const size = level * level;
    for (let i = 1; i <= size; i++) {
        numbers.push(i);
    }
    return shuffle(numbers);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard(level) {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${level}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${level}, 1fr)`;

    sequence.forEach((number, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.textContent = number;

        // 마우스 클릭과 터치 이벤트 모두를 지원
        gridItem.addEventListener('click', () => handleNumberClick(number, gridItem));
        gridItem.addEventListener('touchstart', () => handleNumberClick(number, gridItem));

        board.appendChild(gridItem);
    });
}

function handleNumberClick(number, element) {
    const nextNumber = userSequence.length + 1;
    if (number === nextNumber) {
        element.classList.add('correct');
        userSequence.push(number);
        score += 1;  // 점수를 클릭할 때마다 +1점
        updateScore();

        if (userSequence.length === sequence.length) {
            clearInterval(timerInterval);
            setTimeout(() => {
                level++;
                startLevel();
            }, 1000);
        }
    } else {
        element.classList.add('wrong');
        clearInterval(timerInterval);
        showGameOverMessage("올바른 숫자를 선택하지 않았습니다! 게임이 끝났습니다.");
    }
}

function startTimer(timeLimit) {
    time = timeLimit;
    updateTime();
    timerInterval = setInterval(() => {
        time--;
        updateTime();
        if (time <= 0) {
            clearInterval(timerInterval);
            time = 0;  // 시간 0으로 설정
            updateTime();
            showGameOverMessage("시간이 초과되어 게임이 끝났습니다.");
        }
    }, 1000);
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateTime() {
    document.getElementById('time').textContent = time;
}

function showGameOverMessage(message) {
    const board = document.getElementById('game-board');
    board.innerHTML = '';  // 게임 보드를 비웁니다.

    // 안내 문구를 숨깁니다.
    const instruction = document.getElementById('game-instruction');
    if (instruction) {
        instruction.style.display = 'none';
    }

    // 메시지 생성
    const messageElement = document.createElement('div');
    messageElement.classList.add('game-over-message');
    messageElement.textContent = message;

    // 버튼 컨테이너 생성
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // 다시 시작 버튼 생성
    const restartButton = document.createElement('button');
    restartButton.textContent = '다시 시작';
    restartButton.classList.add('btn', 'btn-primary', 'large-button');
    restartButton.addEventListener('click', initGame);
    restartButton.addEventListener('touchstart', initGame);  // 터치 지원

    // 종료 버튼 생성
    const endButton = document.createElement('button');
    endButton.textContent = '종료';
    endButton.id = 'end-button';
    endButton.classList.add('btn', 'btn-secondary', 'large-button');
    endButton.addEventListener('click', () => {
        document.getElementById('hidden-game-link').click();
    });
    endButton.addEventListener('touchstart', () => {
        document.getElementById('hidden-game-link').click();  // 터치 지원
    });

    // 버튼들을 컨테이너에 추가
    buttonContainer.appendChild(restartButton);
    buttonContainer.appendChild(endButton);

    // 컨테이너 생성 및 배치
    const container = document.createElement('div');
    container.classList.add('game-over-container');
    container.appendChild(messageElement);
    container.appendChild(buttonContainer);

    // board 대신 header 아래에 메시지를 추가
    const header = document.querySelector('.header');
    header.insertAdjacentElement('afterend', container);
}

// Initialize the game when the page loads
window.onload = initGame;
