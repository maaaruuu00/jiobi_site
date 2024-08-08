// 길이 변환
function convertLength() {
    var input = parseFloat(document.getElementById('length-input').value);
    var unit = document.getElementById('length-unit').value;
    var results = {};

    switch (unit) {
        case 'meter':
            results.meter = input;
            results.kilometer = input / 1000;
            results.centimeter = input * 100;
            results.millimeter = input * 1000;
            results.mile = input / 1609.34;
            results.yard = input / 0.9144;
            results.foot = input / 0.3048;
            results.inch = input / 0.0254;
            break;
        case 'kilometer':
            results.meter = input * 1000;
            results.kilometer = input;
            results.centimeter = input * 100000;
            results.millimeter = input * 1000000;
            results.mile = input / 1.60934;
            results.yard = input * 1093.61;
            results.foot = input * 3280.84;
            results.inch = input * 39370.1;
            break;
        case 'centimeter':
            results.meter = input / 100;
            results.kilometer = input / 100000;
            results.centimeter = input;
            results.millimeter = input * 10;
            results.mile = input / 160934;
            results.yard = input / 91.44;
            results.foot = input / 30.48;
            results.inch = input / 2.54;
            break;
        case 'millimeter':
            results.meter = input / 1000;
            results.kilometer = input / 1000000;
            results.centimeter = input / 10;
            results.millimeter = input;
            results.mile = input / 1609340;
            results.yard = input / 914.4;
            results.foot = input / 304.8;
            results.inch = input / 25.4;
            break;
        case 'mile':
            results.meter = input * 1609.34;
            results.kilometer = input * 1.60934;
            results.centimeter = input * 160934;
            results.millimeter = input * 1609340;
            results.mile = input;
            results.yard = input * 1760;
            results.foot = input * 5280;
            results.inch = input * 63360;
            break;
        case 'yard':
            results.meter = input * 0.9144;
            results.kilometer = input * 0.0009144;
            results.centimeter = input * 91.44;
            results.millimeter = input * 914.4;
            results.mile = input / 1760;
            results.yard = input;
            results.foot = input * 3;
            results.inch = input * 36;
            break;
        case 'foot':
            results.meter = input * 0.3048;
            results.kilometer = input * 0.0003048;
            results.centimeter = input * 30.48;
            results.millimeter = input * 304.8;
            results.mile = input / 5280;
            results.yard = input / 3;
            results.foot = input;
            results.inch = input * 12;
            break;
        case 'inch':
            results.meter = input * 0.0254;
            results.kilometer = input * 0.0000254;
            results.centimeter = input * 2.54;
            results.millimeter = input * 25.4;
            results.mile = input / 63360;
            results.yard = input / 36;
            results.foot = input / 12;
            results.inch = input;
            break;
    }

    var resultString = `
        <table class="table">
            <thead>
                <tr>
                    <th>단위</th>
                    <th>값</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>미터</td><td>${results.meter}</td></tr>
                <tr><td>킬로미터</td><td>${results.kilometer}</td></tr>
                <tr><td>센티미터</td><td>${results.centimeter}</td></tr>
                <tr><td>밀리미터</td><td>${results.millimeter}</td></tr>
                <tr><td>마일</td><td>${results.mile}</td></tr>
                <tr><td>야드</td><td>${results.yard}</td></tr>
                <tr><td>피트</td><td>${results.foot}</td></tr>
                <tr><td>인치</td><td>${results.inch}</td></tr>
            </tbody>
        </table>
    `;

    document.getElementById('length-result').innerHTML = resultString;
}

// 무게 변환
function convertWeight() {
    var input = parseFloat(document.getElementById('weight-input').value);
    var unit = document.getElementById('weight-unit').value;
    var results = {};

    switch (unit) {
        case 'kilogram':
            results.kilogram = input;
            results.gram = input * 1000;
            results.milligram = input * 1000000;
            results.ton = input / 1000;
            results.pound = input * 2.20462;
            results.ounce = input * 35.274;
            break;
        case 'gram':
            results.kilogram = input / 1000;
            results.gram = input;
            results.milligram = input * 1000;
            results.ton = input / 1000000;
            results.pound = input * 0.00220462;
            results.ounce = input * 0.035274;
            break;
        case 'milligram':
            results.kilogram = input / 1000000;
            results.gram = input / 1000;
            results.milligram = input;
            results.ton = input / 1000000000;
            results.pound = input * 0.00000220462;
            results.ounce = input * 0.000035274;
            break;
        case 'ton':
            results.kilogram = input * 1000;
            results.gram = input * 1000000;
            results.milligram = input * 1000000000;
            results.ton = input;
            results.pound = input * 2204.62;
            results.ounce = input * 35274;
            break;
        case 'pound':
            results.kilogram = input * 0.453592;
            results.gram = input * 453.592;
            results.milligram = input * 453592;
            results.ton = input / 2204.62;
            results.pound = input;
            results.ounce = input * 16;
            break;
        case 'ounce':
            results.kilogram = input * 0.0283495;
            results.gram = input * 28.3495;
            results.milligram = input * 28349.5;
            results.ton = input / 35274;
            results.pound = input / 16;
            results.ounce = input;
            break;
    }

    var resultString = `
        <table class="table">
            <thead>
                <tr>
                    <th>단위</th>
                    <th>값</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>킬로그램</td><td>${results.kilogram}</td></tr>
                <tr><td>그램</td><td>${results.gram}</td></tr>
                <tr><td>밀리그램</td><td>${results.milligram}</td></tr>
                <tr><td>톤</td><td>${results.ton}</td></tr>
                <tr><td>파운드</td><td>${results.pound}</td></tr>
                <tr><td>온스</td><td>${results.ounce}</td></tr>
            </tbody>
        </table>
    `;

    document.getElementById('weight-result').innerHTML = resultString;
}

// 부피 변환
function convertVolume() {
    var input = parseFloat(document.getElementById('volume-input').value);
    var unit = document.getElementById('volume-unit').value;
    var results = {};

    switch (unit) {
        case 'liter':
            results.liter = input;
            results.milliliter = input * 1000;
            results.cubicMeter = input / 1000;
            results.cubicCentimeter = input * 1000;
            results.gallon = input * 0.264172;
            results.pint = input * 2.11338;
            break;
        case 'milliliter':
            results.liter = input / 1000;
            results.milliliter = input;
            results.cubicMeter = input / 1000000;
            results.cubicCentimeter = input;
            results.gallon = input * 0.000264172;
            results.pint = input * 0.00211338;
            break;
        case 'cubic-meter':
            results.liter = input * 1000;
            results.milliliter = input * 1000000;
            results.cubicMeter = input;
            results.cubicCentimeter = input * 1000000;
            results.gallon = input * 264.172;
            results.pint = input * 2113.38;
            break;
        case 'cubic-centimeter':
            results.liter = input / 1000;
            results.milliliter = input;
            results.cubicMeter = input / 1000000;
            results.cubicCentimeter = input;
            results.gallon = input * 0.000264172;
            results.pint = input * 0.00211338;
            break;
        case 'gallon':
            results.liter = input / 0.264172;
            results.milliliter = input / 0.000264172;
            results.cubicMeter = input / 264.172;
            results.cubicCentimeter = input / 0.000264172;
            results.gallon = input;
            results.pint = input * 8;
            break;
        case 'pint':
            results.liter = input / 2.11338;
            results.milliliter = input / 0.00211338;
            results.cubicMeter = input / 2113.38;
            results.cubicCentimeter = input / 0.00211338;
            results.gallon = input / 8;
            results.pint = input;
            break;
    }

    var resultString = `
        <table class="table">
            <thead>
                <tr>
                    <th>단위</th>
                    <th>값</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>리터</td><td>${results.liter}</td></tr>
                <tr><td>밀리리터</td><td>${results.milliliter}</td></tr>
                <tr><td>세제곱미터</td><td>${results.cubicMeter}</td></tr>
                <tr><td>세제곱센티미터</td><td>${results.cubicCentimeter}</td></tr>
                <tr><td>갤런</td><td>${results.gallon}</td></tr>
                <tr><td>파인트</td><td>${results.pint}</td></tr>
            </tbody>
        </table>
    `;

    document.getElementById('volume-result').innerHTML = resultString;
}

// 넓이 변환
function convertArea() {
    var input = parseFloat(document.getElementById('area-input').value);
    var unit = document.getElementById('area-unit').value;
    var results = {};

    switch (unit) {
        case 'square-meter':
            results.squareMeter = input;
            results.squareKilometer = input / 1000000;
            results.squareCentimeter = input * 10000;
            results.squareMillimeter = input * 1000000;
            results.hectare = input / 10000;
            results.acre = input / 4046.86;
            break;
        case 'square-kilometer':
            results.squareMeter = input * 1000000;
            results.squareKilometer = input;
            results.squareCentimeter = input * 10000000000;
            results.squareMillimeter = input * 1000000000000;
            results.hectare = input * 100;
            results.acre = input * 247.105;
            break;
        case 'square-centimeter':
            results.squareMeter = input / 10000;
            results.squareKilometer = input / 10000000000;
            results.squareCentimeter = input;
            results.squareMillimeter = input * 100;
            results.hectare = input / 100000000;
            results.acre = input / 40468564.2;
            break;
        case 'square-millimeter':
            results.squareMeter = input / 1000000;
            results.squareKilometer = input / 1000000000000;
            results.squareCentimeter = input / 100;
            results.squareMillimeter = input;
            results.hectare = input / 10000000000;
            results.acre = input / 4046856422.4;
            break;
        case 'hectare':
            results.squareMeter = input * 10000;
            results.squareKilometer = input / 100;
            results.squareCentimeter = input * 100000000;
            results.squareMillimeter = input * 10000000000;
            results.hectare = input;
            results.acre = input * 2.47105;
            break;
        case 'acre':
            results.squareMeter = input * 4046.86;
            results.squareKilometer = input / 247.105;
            results.squareCentimeter = input * 40468564.2;
            results.squareMillimeter = input * 4046856422.4;
            results.hectare = input / 2.47105;
            results.acre = input;
            break;
    }

    var resultString = `
        <table class="table">
            <thead>
                <tr>
                    <th>단위</th>
                    <th>값</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>제곱미터</td><td>${results.squareMeter}</td></tr>
                <tr><td>제곱킬로미터</td><td>${results.squareKilometer}</td></tr>
                <tr><td>제곱센티미터</td><td>${results.squareCentimeter}</td></tr>
                <tr><td>제곱밀리미터</td><td>${results.squareMillimeter}</td></tr>
                <tr><td>헥타르</td><td>${results.hectare}</td></tr>
                <tr><td>에이커</td><td>${results.acre}</td></tr>
            </tbody>
        </table>
    `;

    document.getElementById('area-result').innerHTML = resultString;
}
