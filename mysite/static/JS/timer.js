document.addEventListener("DOMContentLoaded", () => {
    const timersContainer = document.getElementById("timers");
    const addTimerButton = document.getElementById("addTimerButton");
    const add5MinButton = document.getElementById("add5MinButton");
    const add10MinButton = document.getElementById("add10MinButton");

    addTimerButton.addEventListener("click", function() {
        addTimer();
    });

    add5MinButton.addEventListener("click", function() {
        addTimer(5 * 60); // 5분을 초로 변환
    });

    add10MinButton.addEventListener("click", function() {
        addTimer(10 * 60); // 10분을 초로 변환
    });

    // 페이지 로드 시 기본 타이머 추가
    addTimer(); // 이 코드를 추가하면 페이지가 로드될 때 자동으로 타이머가 추가됩니다.

    function addTimer(initialSeconds = 0) {
        const container = document.createElement("div");
        container.className = "timer mb-4 p-3 border rounded";

        const timerDisplay = document.createElement("div");
        timerDisplay.className = "timer-display h3";
        timerDisplay.textContent = formatTime(initialSeconds);
        container.appendChild(timerDisplay);

        const hoursInput = document.createElement("input");
        const minutesInput = document.createElement("input");
        const secondsInput = document.createElement("input");

        [hoursInput, minutesInput, secondsInput].forEach((input, index) => {
            input.type = "number";
            input.min = "0";
            input.max = "59";
            input.placeholder = ["시간", "분", "초"][index];
            input.className = "timer-input mx-1";
            container.appendChild(input);
        });
        hoursInput.max = "99";

        const startButton = document.createElement("button");
        startButton.textContent = "시작";
        startButton.className = "btn btn-success mx-1";
        container.appendChild(startButton);

        const resetButton = document.createElement("button");
        resetButton.textContent = "리셋";
        resetButton.className = "btn btn-secondary mx-1";
        container.appendChild(resetButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "제거";
        removeButton.className = "btn btn-danger mx-1";
        container.appendChild(removeButton);

        timersContainer.appendChild(container);

        let isRunning = false;
        let intervalId;
        let totalSeconds = initialSeconds;

        startButton.addEventListener("click", function() {
            if (!isRunning && !intervalId) {
                if (totalSeconds <= 0) {
                    totalSeconds = parseInt(hoursInput.value || 0) * 3600 + parseInt(minutesInput.value || 0) * 60 + parseInt(secondsInput.value || 0);
                    if (totalSeconds <= 0) {
                        alert("시간을 설정해주세요.");
                        return;
                    }
                }
                startTimer();
            } else if (isRunning && intervalId) {
                clearInterval(intervalId);
                intervalId = null;
                isRunning = false;
                startButton.textContent = "계속";
            } else {
                startTimer();
            }
        });

        function startTimer() {
            isRunning = true;
            startButton.textContent = "정지";
            intervalId = setInterval(() => {
                updateDisplay();
                if (totalSeconds <= 0) {
                    clearInterval(intervalId);
                    intervalId = null;
                    isRunning = false;
                    startButton.textContent = "시작";
                    
                    const timerAlarm = document.getElementById("timerAlarm");
                    if (timerAlarm) {
                        timerAlarm.play();
                    }
                    
                    // 사용자 정의 모달 표시
                    const modal = document.getElementById("myModal");
                    const span = document.getElementsByClassName("close")[0];
                    modal.style.display = "block";
                    
                    // 사용자가 모달을 닫으면 오디오 재생 중지
                    span.onclick = function() {
                        modal.style.display = "none";
                        if (timerAlarm) {
                            timerAlarm.pause(); // 오디오 재생 중지
                            timerAlarm.currentTime = 0; // 오디오 재생 위치를 처음으로 리셋
                        }
                    };
                }
                totalSeconds--;
            }, 1000);
        }

        resetButton.addEventListener("click", function() {
            clearInterval(intervalId);
            intervalId = null;
            timerDisplay.textContent = "00:00:00";
            isRunning = false;
            startButton.textContent = "시작";
            totalSeconds = 0;
            [hoursInput, minutesInput, secondsInput].forEach(input => input.value = "");
        });

        removeButton.addEventListener("click", function() {
            clearInterval(intervalId);
            timersContainer.removeChild(container);
        });

        function updateDisplay() {
            timerDisplay.textContent = formatTime(totalSeconds);
        }
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }
});
