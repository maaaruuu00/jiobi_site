document.addEventListener('DOMContentLoaded', () => {
    const alarmsContainer = document.getElementById('alarmsContainer');
    const addAlarmButton = document.getElementById('addAlarmButton');
    const alarmSound = document.getElementById('alarmSound');

    // 알림 권한 요청
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    addAlarmButton.addEventListener('click', () => {
        addAlarm();
    });

    // 기본 알람 추가
    addAlarm();

    function addAlarm() {
        const alarmDiv = document.createElement('div');
        alarmDiv.className = 'card my-3';
        alarmDiv.innerHTML = `
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="time" class="form-control alarm-time" value="${getCurrentTime()}" required>
                    <input type="text" class="form-control alarm-message" placeholder="알림 메시지" required>
                </div>
                <button class="btn btn-success start-alarm">시작</button>
                <button class="btn btn-danger remove-alarm">제거</button>
                <div class="mt-3 remaining-time"></div>
            </div>
        `;
        alarmsContainer.appendChild(alarmDiv);

        const startButton = alarmDiv.querySelector('.start-alarm');
        const removeButton = alarmDiv.querySelector('.remove-alarm');
        const timeInput = alarmDiv.querySelector('.alarm-time');
        const messageInput = alarmDiv.querySelector('.alarm-message');
        const remainingTimeDiv = alarmDiv.querySelector('.remaining-time');

        startButton.addEventListener('click', () => {
            let alarmTime = new Date();
            const [hours, minutes] = timeInput.value.split(':');
            alarmTime.setHours(hours);
            alarmTime.setMinutes(minutes);
            alarmTime.setSeconds(0);

            const now = new Date();
            if (alarmTime <= now) {
                // 알람 시간이 현재 시간보다 이전이면 다음 날로 설정
                alarmTime.setDate(alarmTime.getDate() + 1);
            }

            const alarmMessage = messageInput.value;

            startAlarm(alarmTime, alarmMessage, remainingTimeDiv, alarmDiv);
        });

        removeButton.addEventListener('click', () => {
            alarmsContainer.removeChild(alarmDiv);
        });
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function startAlarm(alarmTime, alarmMessage, remainingTimeDiv, alarmDiv) {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = alarmTime - now;

            if (timeDiff <= 0) {
                clearInterval(interval);
                remainingTimeDiv.innerHTML = '알람이 울립니다!';
                showNotification(alarmMessage);
                alarmSound.play();
                alarmsContainer.removeChild(alarmDiv);
            } else {
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                remainingTimeDiv.innerHTML = `남은 시간: ${hours}시간 ${minutes}분 ${seconds}초`;
            }
        }, 1000);
    }

    function showNotification(message) {
        if (Notification.permission === "granted") {
            const notification = new Notification('알람', {
                body: message,
                icon: 'path/to/icon.png' // 아이콘 경로를 추가할 수 있습니다.
            });

            notification.onclick = function() {
                alarmSound.pause();
                alarmSound.currentTime = 0;
                notification.close();
            };

            notification.onclose = function() {
                alarmSound.pause();
                alarmSound.currentTime = 0;
            };
        } else {
            alert(message);
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
    }
});
