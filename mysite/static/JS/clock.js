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
const stopwatch = document.getElementById("stopwatch");
const millisecondsDisplay = document.getElementById("milliseconds");
const startStopButton = document.getElementById("startStopButton");
const lapButton = document.getElementById("lapButton");
const resetButton = document.getElementById("resetButton");
const lapList = document.getElementById("lapList");

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
stopwatch.textContent = formattedTime;
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

startStopButton.addEventListener("click", startStop);
lapButton.addEventListener("click", lap);
resetButton.addEventListener("click", reset);
});




