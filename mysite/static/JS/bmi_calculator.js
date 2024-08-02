document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');
    const userBmiIndicator = document.getElementById('userBmiIndicator');

    bmiForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const height = parseFloat(document.getElementById('height').value) / 100; // cm to meters
        const weight = parseFloat(document.getElementById('weight').value);

        if (height > 0 && weight > 0) {
            const bmi = (weight / (height * height)).toFixed(2);
            let category = '';

            if (bmi < 18.5) {
                category = '저체중';
            } else if (bmi >= 18.5 && bmi < 24.9) {
                category = '정상 체중';
            } else if (bmi >= 25 && bmi < 29.9) {
                category = '과체중';
            } else {
                category = '비만';
            }

            bmiResult.innerHTML = `당신의 BMI는 <strong>${bmi}</strong>입니다. (${category})`;

            // BMI 표시 위치 업데이트
            const bmiValue = parseFloat(bmi);
            const containerWidth = document.querySelector('.chart-container').clientWidth;
            const indicatorPosition = ((bmiValue - 10) / 30) * containerWidth; // BMI 범위를 10-40으로 설정 (약간의 여유 포함)

            userBmiIndicator.style.left = `${indicatorPosition}px`;
        } else {
            bmiResult.innerHTML = '유효한 값을 입력해 주세요.';
        }
    });
});
