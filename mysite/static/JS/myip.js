document.getElementById('findMyIpBtn').addEventListener('click', function() {
    // ipify를 사용하여 사용자의 IP 주소를 가져옴
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            document.getElementById('myIp').textContent = `내 IP 주소는: ${userIp}`;
            // ipinfo.io를 사용하여 위치 정보를 가져옴
            return fetch(`https://ipinfo.io/${userIp}/geo`);
        })
        .then(response => response.json())
        .then(geoData => {
            const loc = geoData.loc.split(',');
            const lat = parseFloat(loc[0]);
            const lon = parseFloat(loc[1]);
            // Leaflet.js를 사용하여 지도에 위치를 표시
            const map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([lat, lon]).addTo(map)
                .bindPopup('여기가 당신의 위치입니다!')
                .openPopup();
        })
        .catch(error => console.error('Error:', error));
});
