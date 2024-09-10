let output = ''; // 계산 결과를 저장할 변수

// 숫자 및 연산자 버튼 클릭 시 호출되는 함수
function appendToOutput(value) {
    // 기존 값에 소수점이 포함된 숫자와 새로운 소수점을 추가할 수 있는지 검사
    const lastChar = output[output.length - 1];
    
    // 연산자나 괄호 뒤에 소수점을 추가할 수 없도록 하기 위해
    if (value === '.' && (lastChar === '.' || ['+', '-', '*', '/', '%', '(', ')'].includes(lastChar))) {
        return; // 소수점이 연산자 또는 괄호 뒤에 있으면 추가하지 않음
    }
    
    output += value; // 클릭한 버튼의 값이 결과에 추가됨
    updateOutputScreen(); // 결과를 화면에 출력
}

// 등호 버튼 클릭 시 호출되는 함수
function calculate() {
    try {
        // 쉼표 제거하고 % 연산자를 처리
        let cleanOutput = output.replace(/,/g, '');
        cleanOutput = processPercent(cleanOutput); // 퍼센트 연산 처리
        output = eval(cleanOutput);
        // 결과를 소수점 2자리까지 반올림 후 문자열로 변환
        output = parseFloat(output.toFixed(2));
        output = formatNumber(output); // 천 단위 쉼표 추가
        updateOutputScreen();
    } catch (error) {
        // 연산 오류 발생 시 에러 메시지 출력
        output = 'Error';
        updateOutputScreen();
    }
}

// 퍼센트 연산을 처리하는 함수
function processPercent(expression) {
    // %를 발견하고 해당 퍼센트 연산을 처리
    return expression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => {
        return `(${p1} / 100)`;
    });
}

// 화면 초기화 (C 버튼 클릭 시 호출)
function clearOutput() {
    output = '';
    updateOutputScreen();
}

// 백스페이스 (←) 버튼 클릭 시 호출되는 함수
function backspace() {
    // 쉼표를 제거하고 마지막 문자 삭제
    const cleanOutput = output.replace(/,/g, '');
    output = cleanOutput.slice(0, -1);
    output = formatNumberForInput(output);
    updateOutputScreen();
}

// 결과를 화면에 출력하는 함수
function updateOutputScreen() {
    document.getElementById('output-screen').value = output;
}

// 천 단위로 쉼표 추가하는 함수
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 숫자 입력 시 천 단위 쉼표 추가
function formatNumberForInput(number) {
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// 버튼 클릭 이벤트 설정
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            clearOutput();
        } else if (buttonText === '←') {
            backspace();
        } else if (buttonText === '=') {
            calculate();
        } else {
            appendToOutput(buttonText);
        }
    });
});

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
        backspace();
    }

    // 엔터 키를 누르면 결과를 계산
    if (key === "Enter") {
        calculate();
    }

    // 숫자나 연산자 키를 누르면 결과에 해당 키를 추가
    if ((/\d/).test(key) || "+-*/%()".includes(key) || key === '.') {
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
            try {
                const cleanCalculation = calculation.replace(/,/g, '');
                const result = eval(processPercent(cleanCalculation)); // 퍼센트 연산 처리
                // 결과를 소수점 2자리까지 반올림
                const roundedResult = parseFloat(result.toFixed(2));
                // 천 단위 쉼표 추가
                const formattedResult = formatNumber(roundedResult);
                p.textContent = `${index + 1}. ${calculation} = ${formattedResult}`; // 결과값 추가
                historyContent.appendChild(p);
            } catch (e) {
                p.textContent = `${index + 1}. ${calculation} = Error`;
                historyContent.appendChild(p);
            }
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
        try {
            const cleanCalculation = calculation.replace(/,/g, '');
            const result = eval(processPercent(cleanCalculation)); // 퍼센트 연산 처리
            // 결과를 소수점 2자리까지 반올림
            const roundedResult = parseFloat(result.toFixed(2));
            // 천 단위 쉼표 추가
            outputScreen.value = formatNumber(roundedResult);
        } catch (e) {
            outputScreen.value = 'Error';
        }
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
