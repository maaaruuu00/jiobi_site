document.addEventListener("DOMContentLoaded", function() {

    function convertLength() {
        const inputValue = parseFloat(document.getElementById('lengthInput').value);
        const unit = document.getElementById('lengthUnit').value;

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

        document.getElementById('cm').value = (cmValue * conversionRates.cm).toFixed(3);
        document.getElementById('m').value = (cmValue * conversionRates.m).toFixed(3);
        document.getElementById('inch').value = (cmValue * conversionRates.inch).toFixed(3);
        document.getElementById('feet').value = (cmValue * conversionRates.feet).toFixed(3);
        document.getElementById('yard').value = (cmValue * conversionRates.yard).toFixed(3);
        document.getElementById('mile').value = (cmValue * conversionRates.mile).toFixed(3);
        document.getElementById('ja').value = (cmValue * conversionRates.ja).toFixed(3);
        document.getElementById('gan').value = (cmValue * conversionRates.gan).toFixed(3);
        document.getElementById('jeng').value = (cmValue * conversionRates.jeng).toFixed(3);
        document.getElementById('li').value = (cmValue * conversionRates.li).toFixed(3);
        document.getElementById('knot').value = (cmValue * conversionRates.knot).toFixed(3);
    }

    function convertWeight() {
        const inputValue = parseFloat(document.getElementById('weightInput').value);
        const unit = document.getElementById('weightUnit').value;

        const conversionRates = {
            g: 1,
            kg: 0.001,  // 그램에서 킬로그램으로 변환할 때 1000으로 나눕니다.
            ton: 0.000001,  // 그램에서 톤으로 변환할 때 1000000으로 나눕니다.
            grain: 15.4324,
            ounce: 0.035274,  // 그램에서 온스로 변환할 때 28.3495로 나눕니다.
            pound: 0.00220462,  // 그램에서 파운드로 변환할 때 453.592로 나눕니다.
            don: 0.266667,  // 그램에서 돈으로 변환할 때 3.75로 나눕니다.
            gun: 0.00166667,  // 그램에서 근으로 변환할 때 600으로 나눕니다.
            guan: 0.000266667  // 그램에서 관으로 변환할 때 3750으로 나눕니다.
        };

        const gValue = inputValue / conversionRates[unit];

        document.getElementById('g').value = (gValue * conversionRates.g).toFixed(3);
        document.getElementById('kg').value = (gValue * conversionRates.kg).toFixed(3);
        document.getElementById('ton').value = (gValue * conversionRates.ton).toFixed(3);
        document.getElementById('grain').value = (gValue * conversionRates.grain).toFixed(3);
        document.getElementById('ounce').value = (gValue * conversionRates.ounce).toFixed(3);
        document.getElementById('pound').value = (gValue * conversionRates.pound).toFixed(3);
        document.getElementById('don').value = (gValue * conversionRates.don).toFixed(3);
        document.getElementById('gun').value = (gValue * conversionRates.gun).toFixed(3);
        document.getElementById('guan').value = (gValue * conversionRates.guan).toFixed(3);
    }

    function convertArea() {
        const inputValue = parseFloat(document.getElementById('areaInput').value);
        const unit = document.getElementById('areaUnit').value;

        const conversionRates = {
            pyong: 1,
            py: 0.3025,
            danbo: 0.0001,
            jeongbo: 0.00001,
            sqm: 3.3058,
            are: 0.033058,
            sqft: 35.5832,
            sqyd: 1.19599,
            acre: 0.0000247105
        };

        const pyongValue = inputValue / conversionRates[unit];

        document.getElementById('pyong').value = (pyongValue * conversionRates.pyong).toFixed(3);
        document.getElementById('py').value = (pyongValue * conversionRates.py).toFixed(3);
        document.getElementById('danbo').value = (pyongValue * conversionRates.danbo).toFixed(3);
        document.getElementById('jeongbo').value = (pyongValue * conversionRates.jeongbo).toFixed(3);
        document.getElementById('sqm').value = (pyongValue * conversionRates.sqm).toFixed(3);
        document.getElementById('are').value = (pyongValue * conversionRates.are).toFixed(3);
        document.getElementById('sqft').value = (pyongValue * conversionRates.sqft).toFixed(3);
        document.getElementById('sqyd').value = (pyongValue * conversionRates.sqyd).toFixed(3);
        document.getElementById('acre').value = (pyongValue * conversionRates.acre).toFixed(3);
    }

    function convertVolume() {
        const inputValue = parseFloat(document.getElementById('volumeInput').value);
        const unit = document.getElementById('volumeUnit').value;

        const conversionRates = {
            hob: 1,
            doe: 0.1,
            mal: 0.01,
            ccm: 180.39,
            cbm: 0.00018,
            liter: 0.18,
            cubicInch: 11.0231,
            cubicFeet: 0.006356,
            cubicYard: 0.000235,
            gallon: 0.047
        };

        const hobValue = inputValue / conversionRates[unit];

        document.getElementById('hob').value = (hobValue * conversionRates.hob).toFixed(3);
        document.getElementById('doe').value = (hobValue * conversionRates.doe).toFixed(3);
        document.getElementById('mal').value = (hobValue * conversionRates.mal).toFixed(3);
        document.getElementById('ccm').value = (hobValue * conversionRates.ccm).toFixed(3);
        document.getElementById('cbm').value = (hobValue * conversionRates.cbm).toFixed(3);
        document.getElementById('liter').value = (hobValue * conversionRates.liter).toFixed(3);
        document.getElementById('cubicInch').value = (hobValue * conversionRates.cubicInch).toFixed(3);
        document.getElementById('cubicFeet').value = (hobValue * conversionRates.cubicFeet).toFixed(3);
        document.getElementById('cubicYard').value = (hobValue * conversionRates.cubicYard).toFixed(3);
        document.getElementById('gallon').value = (hobValue * conversionRates.gallon).toFixed(3);
    }

    document.getElementById("lengthConvertButton").addEventListener("click", convertLength);
    document.getElementById("weightConvertButton").addEventListener("click", convertWeight);
    document.getElementById("areaConvertButton").addEventListener("click", convertArea);
    document.getElementById("volumeConvertButton").addEventListener("click", convertVolume);
});
