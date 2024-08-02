document.getElementById('heartrate-form').addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    // 입력 값 가져오기
    const age = parseInt(document.getElementById('age').value, 10);
    const gender = document.getElementById('gender').value;
    const restingHeartRate = parseInt(document.getElementById('restingHeartRate').value, 10);
    let maxHeartRate;

    // 최대 심박수 계산
    if (gender === 'female') {
        maxHeartRate = 226 - age; // 여성 공식
    } else {
        maxHeartRate = 220 - age; // 남성 및 기본 공식
    }

    // 여유 심박수 계산
    const reserveHeartRate = maxHeartRate - restingHeartRate;

    // 목표 심박수 계산
    const targetHeartRate = {
        light: calculateTargetHeartRate(reserveHeartRate, 50, 60, restingHeartRate),
        moderate: calculateTargetHeartRate(reserveHeartRate, 60, 70, restingHeartRate),
        moderateHigh: calculateTargetHeartRate(reserveHeartRate, 70, 80, restingHeartRate),
        high: calculateTargetHeartRate(reserveHeartRate, 80, 90, restingHeartRate),
        veryHigh: calculateTargetHeartRate(reserveHeartRate, 90, 100, restingHeartRate),
    };

    // 결과 표시
    displayResults(maxHeartRate, reserveHeartRate, targetHeartRate);
});

function calculateTargetHeartRate(reserveHeartRate, minPercentage, maxPercentage, restingHeartRate) {
    const minTarget = ((reserveHeartRate * minPercentage) / 100) + restingHeartRate;
    const maxTarget = ((reserveHeartRate * maxPercentage) / 100) + restingHeartRate;
    return `${Math.round(minTarget)} - ${Math.round(maxTarget)}`;
}

function displayResults(maxHeartRate, reserveHeartRate, targetHeartRate) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <h3>계산 결과</h3>
        <p>최대 심박수: ${maxHeartRate}회/분</p>
        <p>여유 심박수: ${reserveHeartRate}회/분</p>
        <h4>목표 심박수</h4>
        <p>가벼운 강도: ${targetHeartRate.light}회/분</p>
        <p>보통 강도: ${targetHeartRate.moderate}회/분</p>
        <p>상당한 강도: ${targetHeartRate.moderateHigh}회/분</p>
        <p>고강도: ${targetHeartRate.high}회/분</p>
        <p>매우 고강도: ${targetHeartRate.veryHigh}회/분</p>
    `;
}
