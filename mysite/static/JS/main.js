// exchange_rate.html
document.addEventListener("DOMContentLoaded", () => {
	const apiKey = "5ZZSM%2FqbqYy%2BwNfhcfTGRJhsE71c6AjFNydBUzfpqMfctvVR%2B8bVZyht5KS%2BjA2e4BbXJRmntXUNkp%2Fn2kVIIw%3D%3D"; // 데이터.go.kr에서 발급받은 API 키를 넣어주세요.
	const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=${apiKey}&dataType=JSON&baseDate=20220125&baseTime=0200&nx=60&ny=127`;

	const weatherInfo = document.getElementById("weather-info");

	fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		// 데이터 처리 및 표시하는 코드를 여기에 작성합니다.
		const weatherInfo = data.response.body.items.item;

		// 서울의 도시 코드는 108입니다.
		const seoulWeather = weatherInfo.find(item => item.category === 'PTY' && item.fcstValue === '0');
		const seoulTemperature = weatherInfo.find(item => item.category === 'T3H');

		if (seoulWeather && seoulTemperature) {
			const weatherStatus = seoulWeather.fcstValue === '0' ? '맑음' : '비/눈';
			const temperature = seoulTemperature.fcstValue;

			const weatherInfoDiv = document.getElementById("weather-info");
			weatherInfoDiv.innerHTML = `<p>서울 날씨: ${weatherStatus}</p><p>서울 기온: ${temperature}°C</p>`;
		} else {
			console.error("서울의 날씨 또는 온도 정보를 찾을 수 없습니다.");
		}
})
.catch(error => {
console.error("날씨 정보를 가져오는 중 오류가 발생했습니다:", error);
});
});


// exchange_rate.html
document.addEventListener("DOMContentLoaded", () => {
  const currencyOne = document.getElementById("currencyOne");
  const amountOne = document.getElementById("amount-one");
  const swap = document.getElementById("swap");
  const rate = document.getElementById("rate");
  const currencyTwo = document.getElementById("currencyTwo");
  const amountTwo = document.getElementById("amount-two");

  // 환율 업데이트

  const updateCurrency = async () => {
    const url = await fetch(
      `https://v6.exchangerate-api.com/v6/52f1f656328d5996e352de41/latest/${currencyOne.value}`
    );

    data = await url.json();

    rate.innerText = "1 " + currencyOne.value + " = " + data.conversion_rates[currencyTwo.value] + currencyTwo.value;

    amountTwo.value = (
      amountOne.value * data.conversion_rates[currencyTwo.value]
    ).toFixed(2);
  };

  // 환율 서로 바꾸기

  function changeCurrency() {
    let temp;

    temp = currencyTwo.value;

    currencyTwo.value = currencyOne.value;
    currencyOne.value = temp;
    updateCurrency();
  }

  updateCurrency();

  currencyOne.addEventListener("change", updateCurrency);
  currencyTwo.addEventListener("change", updateCurrency);
  amountOne.addEventListener("input", updateCurrency);
  swap.addEventListener("click", changeCurrency);
});