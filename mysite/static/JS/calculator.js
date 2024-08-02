let output = ''; // 계산 결과를 저장할 변수
let advancedMode = false; // 공학용 모드 여부를 저장할 변수

// 숫자 및 연산자 버튼 클릭 시 호출되는 함수
function appendToOutput(value) {
    output += value; // 클릭한 버튼의 값이 결과에 추가됨
    updateOutputScreen(); // 결과를 화면에 출력
}

// 등호 버튼 클릭 시 호출되는 함수
function calculate() {
    try {
        // JavaScript의 eval 함수를 사용하여 결과 계산
        output = eval(output);
        updateOutputScreen();
    } catch (error) {
        // 연산 오류 발생 시 에러 메시지 출력
        output = 'Error';
        updateOutputScreen();
    }
}

// 화면 초기화 (C 버튼 클릭 시 호출)
function clearOutput() {
    output = '';
    updateOutputScreen();
}

// 결과를 화면에 출력하는 함수
function updateOutputScreen() {
    document.getElementById('output-screen').value = output;
}

// 공학용 버튼 클릭 시 호출되는 함수
function toggleAdvancedMode() {
    advancedMode = !advancedMode; // 공학용 모드 상태 변경

    if (advancedMode) {
        // 공학용 모드가 활성화되면 공학용 버튼 텍스트를 '기본 모드'로 변경
        document.querySelector('.advanced-button').textContent = '기본 모드';
        // 추가적인 공학용 기능을 구현할 수 있음
    } else {
        // 공학용 모드가 비활성화되면 공학용 버튼 텍스트를 '공학용'으로 변경
        document.querySelector('.advanced-button').textContent = '공학용';
    }
}

// 키보드 이벤트 처리 함수
document.addEventListener("keydown", function(event) {
    // 키보드 이벤트에서 눌린 키 코드 가져오기
    const key = event.key;

    // ESC 키를 누르면 계산기 초기화
    if (key === "Escape") {
        clearOutput(); // 결과 초기화
        return; // ESC 키 이후의 코드 실행 방지
    }

    // 백스페이스 키를 누르면 화면에서 마지막 문자 삭제
    if (key === "Backspace") {
        output = output.slice(0, -1); // 결과의 마지막 문자 삭제
        updateOutputScreen();
    }

    // 엔터 키를 누르면 결과를 계산
    if (key === "Enter") {
        calculate();
    }

    // 숫자나 연산자 키를 누르면 결과에 해당 키를 추가
    if ((/\d/).test(key) || "+-*/.".includes(key)) {
        appendToOutput(key);
    }
});

// 계산 결과를 저장할 배열 추가
let calculations = [];

// 기록 버튼 클릭 시 저장된 계산 결과를 모달 창에 표시
document.getElementById("historyButton").addEventListener("click", () => {
    const historyContent = document.getElementById("historyContent");
    historyContent.innerHTML = ""; // 모달 내용 초기화
    if (calculations.length === 0) {
        historyContent.textContent = "기록이 없습니다.";
    } else {
        calculations.forEach((calculation, index) => {
            const p = document.createElement("p");
            const result = eval(calculation);
            p.textContent = `${index + 1}. ${calculation} = ${result}`; // 결과값 추가
            historyContent.appendChild(p);
        });
    }
    // 모달 열기
    document.getElementById("historyModal").style.display = "block";
});

// 모달 창의 닫기 버튼 클릭 시 모달 창 닫기
document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("historyModal").style.display = "none";
});

// 계산 결과를 기록하고 표시하는 함수
function calculate() {
    const outputScreen = document.getElementById("output-screen");
    const calculation = outputScreen.value;
    if (calculation !== "") {
        recordCalculation(calculation);
        const result = eval(calculation); // 계산 수행
        outputScreen.value = result;
    }
}

// 계산 결과를 기록하는 함수
function recordCalculation(calculation) {
    calculations.push(calculation);
}

// 기록 모달 창 관련 이벤트 리스너 추가
document.addEventListener("click", function(event) {
    const modal = document.getElementById("historyModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
