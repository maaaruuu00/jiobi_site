let output = ''; // 계산 결과를 저장할 변수

// 계산 결과를 저장할 배열 추가
let calculations = [];

// 숫자 및 연산자 버튼 클릭 시 호출되는 함수
function appendToOutput(value) {
    const lastChar = output[output.length - 1];

    // 연산자와 소수점 관련 문제 해결을 위해 마지막 숫자만 추출
    const lastNumber = output.split(/[+\-*/%]/).pop(); // 마지막 숫자만 추출

    // 소수점이 중복 입력되지 않도록 검사
    if (value === '.') {
        if (lastNumber.includes('.')) {
            return; // 소수점이 이미 있으면 추가하지 않음
        }
    }

    // 연산자 뒤에 소수점 입력 금지
    if (value === '.' && ['+', '-', '*', '/', '%', '(', ')'].includes(lastChar)) {
        return;
    }

    output += value;
    updateOutputScreen();
}

// 등호 버튼 클릭 시 호출되는 함수
function calculate() {
    try {
        // 쉼표 제거하고 % 연산자를 처리
        let cleanOutput = output.replace(/,/g, ''); 
        cleanOutput = processPercent(cleanOutput); // 퍼센트 연산 처리

        // eval을 사용하여 계산 수행
        let result = eval(cleanOutput);

        // 소수점 10자리까지 표시
        result = parseFloat(result.toFixed(10)); // 소수점 이하 10자리로 고정
        output = result.toString();

        // 천 단위 쉼표 추가
        output = formatNumber(output); 
        updateOutputScreen();
    } catch (error) {
        // 연산 오류 발생 시 에러 메시지 출력
        output = 'Error';
        updateOutputScreen();
    }
}


// 퍼센트 연산을 처리하는 함수
function processPercent(expression) {
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
    const cleanOutput = output.replace(/,/g, ''); // 쉼표를 제거
    output = cleanOutput.slice(0, -1); // 마지막 문자 삭제
    updateOutputScreen();
}

// 결과를 화면에 출력하는 함수
function updateOutputScreen() {
    const formattedValue = formatNumberForInput(output); // 출력 포맷을 적용한 값
    document.getElementById('output-screen').value = formattedValue;
}

// 천 단위로 쉼표 추가하는 함수 (소수점 부분 제외)
function formatNumber(number) {
    const parts = number.split('.'); // 정수 부분과 소수점 부분 분리
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 정수 부분에만 쉼표 추가
    return parts.join('.'); // 다시 합쳐서 반환
}

// 숫자 입력 시 천 단위 쉼표 추가
function formatNumberForInput(expression) {
    return expression.replace(/(\d+)(\.\d+)?/g, (match, intPart, decimalPart) => {
        const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimalPart ? `${formattedIntPart}${decimalPart}` : formattedIntPart;
    });
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

// 키보드 이벤트 처리 함수
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key === "Escape") {
        clearOutput();
        return;
    }

    if (key === "Backspace") {
        backspace();
    }

    if (key === "Enter") {
        calculate();
    }

    if ((/\d/).test(key) || "+-*/%()".includes(key) || key === '.') {
        appendToOutput(key);
    }
});
