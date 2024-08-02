// API 호출을 위한 정보
const endpoint = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService";
const apiKey = "5ZZSM%2FqbqYy%2BwNfhcfTGRJhsE71c6AjFNydBUzfpqMfctvVR%2B8bVZyht5KS%2BjA2e4BbXJRmntXUNkp%2Fn2kVIIw%3D%3D";

// 현재 년도 가져오기
let currentYear = new Date().getFullYear();

// 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
    loadYearCalendar(currentYear);

    document.getElementById("previousYearButton").addEventListener("click", () => {
        currentYear--;
        loadYearCalendar(currentYear);
    });

    document.getElementById("nextYearButton").addEventListener("click", () => {
        currentYear++;
        loadYearCalendar(currentYear);
    });

    // 오늘 버튼에 이벤트 핸들러 등록
    document.getElementById("todayButton").addEventListener("click", () => {
        markToday();
    });
});

// 해당 년도의 달력 로드
function loadYearCalendar(year) {
    document.getElementById("currentYear").textContent = `${year}년 달력`;
    document.getElementById("year-calendar").innerHTML = "";
    
    // 공휴일 API 호출
    fetch(`${endpoint}/getHoliDeInfo?solYear=${year}&_type=xml&ServiceKey=${apiKey}`)
        .then(response => response.text())
        .then(data => {
            // XML 파싱
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const holidays = xmlDoc.getElementsByTagName("item");

            // 12달의 달력 생성
            for (let month = 1; month <= 12; month++) {
                const monthCalendar = createMonthCalendar(year, month, holidays);
                document.getElementById("year-calendar").appendChild(monthCalendar);
            }
        })
        .catch(error => console.error("Error fetching holidays:", error));
}

// 해당 달의 달력 생성
function createMonthCalendar(year, month, holidays) {
    const monthCalendar = document.createElement("div");
    monthCalendar.classList.add("month-calendar");

    const monthHeader = document.createElement("h3");
    monthHeader.textContent = `${month}월`;
    monthCalendar.appendChild(monthHeader);

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const monthTable = document.createElement("table");
    monthTable.classList.add("table", "table-bordered");

    // 달력 헤더 (요일)
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    for (const day of weekDays) {
        const dayHeader = document.createElement("th");
        dayHeader.textContent = day;
        headerRow.appendChild(dayHeader);
    }
    tableHeader.appendChild(headerRow);
    monthTable.appendChild(tableHeader);

    // 달력 바디 (날짜)
    const tableBody = document.createElement("tbody");
    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDayOfWeek) {
                cell.textContent = "";
            } else if (currentDay > daysInMonth) {
                break;
            } else {
                cell.textContent = currentDay;
                if (j === 0 || j === 6) { // 주말인 경우
                    cell.classList.add("weekend");
                } else {
                    const holiday = findHoliday(year, month, currentDay, holidays);
                    if (holiday) {
                        cell.classList.add("holiday");
                        cell.title = holiday;
                    }
                }
                currentDay++;
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    monthTable.appendChild(tableBody);

    monthCalendar.appendChild(monthTable);
    return monthCalendar;
}

// 공휴일 찾기
function findHoliday(year, month, day, holidays) {
    const formattedDate = `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;
    for (const holiday of holidays) {
        const date = holiday.getElementsByTagName("locdate")[0].textContent.replace(/-/g, "");
        if (date === formattedDate) {
            return holiday.getElementsByTagName("dateName")[0].textContent;
        }
    }
    return null;
}

// 오늘 표시
function markToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const cells = document.querySelectorAll(".month-calendar tbody td");
    cells.forEach(cell => {
        cell.classList.remove("today");
        if (cell.textContent == day && cell.closest(".month-calendar").querySelector("h3").textContent.replace("월", "") == month) {
            cell.classList.add("today");
        }
    });

    // 페이지를 오늘로 이동
    const currentMonth = document.querySelector(`.month-calendar:nth-child(${month})`);
    const offsetTop = currentMonth.offsetTop - (window.innerHeight / 2);
    window.scrollTo(0, offsetTop);
}



// 공휴일 목록 출력
function displayHolidays(holidays) {
    const holidayList = document.getElementById("holiday-list");
    holidayList.innerHTML = "<h4>공휴일</h4>";
    holidays.forEach(holiday => {
        const date = holiday.getElementsByTagName("locdate")[0].textContent;
        const name = holiday.getElementsByTagName("dateName")[0].textContent;
        const holidayText = document.createElement("p");
        holidayText.textContent = `${date} : ${name}`;
        holidayList.appendChild(holidayText);
    });
}

// 해당 년도의 달력 로드
function loadYearCalendar(year) {
    document.getElementById("currentYear").textContent = `${year}년 달력`;
    document.getElementById("year-calendar").innerHTML = "";

    // 공휴일 API 호출
    fetch(`${endpoint}/getHoliDeInfo?solYear=${year}&_type=xml&ServiceKey=${apiKey}`)
        .then(response => response.text())
        .then(data => {
            // XML 파싱
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const holidays = Array.from(xmlDoc.getElementsByTagName("item"));

            // 공휴일 목록 출력
            displayHolidays(holidays);

            // 12달의 달력 생성
            for (let month = 1; month <= 12; month++) {
                const monthCalendar = createMonthCalendar(year, month, holidays);
                document.getElementById("year-calendar").appendChild(monthCalendar);
            }
        })
        .catch(error => console.error("Error fetching holidays:", error));
}
