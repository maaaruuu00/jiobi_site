// doryang.js

function convertLength() {
    const inputValue = parseFloat(document.getElementById('inputValue').value); // HTML에서 inputValue로 변경
    const unit = document.getElementById('unit').value; // HTML에서 unit으로 변경

    const conversionRates = {
        cm: 1,
        m: 0.01,
        inch: 0.393701,
        feet: 0.0328084,
        yard: 0.0109361,
        mile: 0.0000062137,
        ja: 0.033,
        gan: 0.0055,
        jeng: 0.000109361,
        li: 0.0000025,
        knot: 0.0000053996
    };

    const cmValue = inputValue / conversionRates[unit];

    document.getElementById('cm').value = (cmValue * conversionRates.cm).toFixed(4);
    document.getElementById('m').value = (cmValue * conversionRates.m).toFixed(4);
    document.getElementById('inch').value = (cmValue * conversionRates.inch).toFixed(4);
    document.getElementById('feet').value = (cmValue * conversionRates.feet).toFixed(4);
    document.getElementById('yard').value = (cmValue * conversionRates.yard).toFixed(4);
    document.getElementById('mile').value = (cmValue * conversionRates.mile).toFixed(4);
    document.getElementById('ja').value = (cmValue * conversionRates.ja).toFixed(4);
    document.getElementById('gan').value = (cmValue * conversionRates.gan).toFixed(4);
    document.getElementById('jeng').value = (cmValue * conversionRates.jeng).toFixed(4);
    document.getElementById('li').value = (cmValue * conversionRates.li).toFixed(4);
    document.getElementById('knot').value = (cmValue * conversionRates.knot).toFixed(4);
}



function convertWeight() {
    const input = document.getElementById('weight-input').value;
    const unit = document.getElementById('weight-unit').value;
    let results = '';
    const conversionRates = {
        gm: 1,
        kg: 1000,
        ton: 1000000,
        grain: 0.06479891,
        ounce: 28.34952,
        pound: 453.59237,
        don: 3.75,
        gun: 600,
        guan: 3750
    };
    const baseValue = input * conversionRates[unit];
    for (const [key, value] of Object.entries(conversionRates)) {
        results += `${key}: ${(baseValue / value).toFixed(4)}<br>`;
    }
    document.getElementById('weight-results').innerHTML = results;
}

function convertVolume() {
    const input = document.getElementById('volume-input').value;
    const unit = document.getElementById('volume-unit').value;
    let results = '';
    const conversionRates = {
        cm3: 1,
        m3: 10,
        inch3: 100,
        feet3: 5543.52,
        yard3: 554352,
        mile3: 5543.52,
        ja3: 0.09083,
        gan3: 156.966,
        jeng3: 4238.09,
        li3: 20.9833
    };
    const baseValue = input * conversionRates[unit];
    for (const [key, value] of Object.entries(conversionRates)) {
        results += `${key}: ${(baseValue / value).toFixed(4)}<br>`;
    }
    document.getElementById('volume-results').innerHTML = results;
}

function convertArea() {
    const input = document.getElementById('area-input').value;
    const unit = document.getElementById('area-unit').value;
    let results = '';
    const conversionRates = {
        cm4: 1,
        m4: 36,
        inch4: 10800,
        feet4: 100000,
        yard4: 12960000,
        mile4: 6600000,
        ja4: 10000,
        gan4: 66000,
        jeng4: 108000
    };
    const baseValue = input * conversionRates[unit];
    for (const [key, value] of Object.entries(conversionRates)) {
        results += `${key}: ${(baseValue / value).toFixed(4)}<br>`;
    }
    document.getElementById('area-results').innerHTML = results;
}
