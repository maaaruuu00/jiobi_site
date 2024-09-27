//---------- 시계 ----------

let is12HourFormat = true; // 초기 값은 12시간 형식

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (is12HourFormat) {
        ampm = hours >= 12 ? '오후' : '오전';
        hours = hours % 12 || 12; // 12시간 형식으로 변환
    }

    const timeString = `${ampm} ${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').innerText = timeString;
}

function toggleClockFormat() {
    is12HourFormat = !is12HourFormat;
    const toggleButton = document.getElementById('toggleClockFormat');
    toggleButton.innerText = is12HourFormat ? '형식 변환' : '형식 변환';
    updateClock(); // 시계 형식 전환 후 시계 업데이트
}

// 탭 변경 이벤트 처리
document.addEventListener('DOMContentLoaded', function () {
    // 시계 탭이 활성화될 때 시계 업데이트 코드 실행
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if (e.target.getAttribute('href') === '#clock-tab') {
            updateClock(); // 시계 업데이트 코드 실행
        }
    });
});

// 1초마다 시계 업데이트
setInterval(updateClock, 1000);

// 초기 시계 업데이트
updateClock();

// 버튼 클릭 이벤트 처리
const toggleButton = document.getElementById('toggleClockFormat');
toggleButton.addEventListener('click', toggleClockFormat);





// clock.js_stopwatch
document.addEventListener("DOMContentLoaded", () => {
    let stopwatchCount = 1;

    // 각 스톱워치를 초기화하는 함수
    function initializeStopwatch(stopwatchElement) {
        const stopwatchDisplay = stopwatchElement.querySelector('.stopwatch-display');
        const millisecondsDisplay = stopwatchElement.querySelector('.milliseconds-display');
        const startStopButton = stopwatchElement.querySelector('.startStopButton');
        const lapButton = stopwatchElement.querySelector('.lapButton');
        const resetButton = stopwatchElement.querySelector('.resetButton');
        const lapList = stopwatchElement.querySelector('.lapList');
        const removeStopwatchButton = stopwatchElement.querySelector('.removeStopwatchButton'); // 제거 버튼

        let timer;
        let isRunning = false;
        let startTime;
        let elapsedTime = 0;
        let lapCount = 1;

        function startStop() {
            if (isRunning) {
                clearInterval(timer);
                startStopButton.textContent = "시작";
            } else {
                startTime = Date.now() - elapsedTime;
                timer = setInterval(updateStopwatch, 10);
                startStopButton.textContent = "정지";
            }
            isRunning = !isRunning;
        }

        function lap() {
            if (isRunning) {
                const lapTime = Date.now() - startTime;
                const formattedLapTime = formatTime(lapTime);
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.textContent = `랩 ${lapCount}: ${formattedLapTime}`;
                lapList.appendChild(listItem);
                lapCount++;
            }
        }

        function reset() {
            clearInterval(timer);
            elapsedTime = 0;
            lapCount = 1;
            lapList.innerHTML = "";
            updateDisplay(0);
            startStopButton.textContent = "시작";
            isRunning = false;
        }

        function updateStopwatch() {
            const currentTime = Date.now();
            elapsedTime = currentTime - startTime;
            updateDisplay(elapsedTime);
        }

        function updateDisplay(time) {
            const formattedTime = formatTime(time);
            stopwatchDisplay.textContent = formattedTime;
            const milliseconds = (time % 1000).toString().padStart(3, "0");
            millisecondsDisplay.textContent = `.${milliseconds}`;
        }

        function formatTime(time) {
            const milliseconds = (time % 1000).toString().padStart(3, "0");
            const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
            const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, "0");
            const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, "0");
            return `${hours}:${minutes}:${seconds}`;
        }

        // 제거 버튼 클릭 시 해당 스톱워치를 삭제
        removeStopwatchButton.addEventListener("click", () => {
            stopwatchElement.remove();
        });

        startStopButton.addEventListener("click", startStop);
        lapButton.addEventListener("click", lap);
        resetButton.addEventListener("click", reset);
    }

    // 초기 스톱워치에 대한 초기화
    const initialStopwatch = document.querySelector('.stopwatch-card');
    initializeStopwatch(initialStopwatch);

    // 새로운 스톱워치를 추가하는 함수
    const addStopwatchButton = document.getElementById("addStopwatchButton");
    addStopwatchButton.addEventListener("click", () => {
        stopwatchCount++;
        const stopwatchContainer = document.getElementById("stopwatch-container");

        // 새로운 스톱워치 요소 생성
        const newStopwatch = document.createElement("div");
        newStopwatch.classList.add("card", "text-center", "stopwatch-card");
        newStopwatch.innerHTML = `
            <div class="card-body">
                <button class="btn btn-outline-danger removeStopwatchButton" style="position: absolute; top: 10px; right: 10px;">제거</button>
                <div class="display-1 stopwatch-display">00:00:00</div>
                <div class="display-4 milliseconds-display">.000</div>
                <div class="mt-4">
                    <button class="btn btn-primary startStopButton">시작</button>
                    <button class="btn btn-info lapButton">랩</button>
                    <button class="btn btn-danger resetButton">리셋</button>
                </div>
                <ul class="list-group mt-4 lapList"></ul>
            </div>
        `;

        // 새로운 스톱워치 추가 및 초기화
        stopwatchContainer.appendChild(newStopwatch);
        initializeStopwatch(newStopwatch);
    });
});
