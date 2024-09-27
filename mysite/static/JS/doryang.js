document.addEventListener("DOMContentLoaded", function() {

    function convertLength() {
        const inputValue = parseFloat(document.getElementById('lengthInput').value);
        const unit = document.getElementById('lengthUnit').value;

        const conversionRates = {
            mm: 1000,              // 1 m = 1,000 mm
            cm: 100,               // 1 m = 100 cm
            m: 1,                  // 1 m = 1 m
            km: 0.001,             // 1 m = 0.001 km
            inch: 39.3701,         // 1 m = 39.3701 inch
            feet: 3.28084,         // 1 m = 3.28084 feet
            yard: 1.09361,         // 1 m = 1.09361 yard
            mile: 0.00062137,      // 1 m = 0.00062137 mile
            ja: 3.3,               // 1 m = 3.3 자 (Ja)
            gan: 0.55,             // 1 m = 0.55 간 (Gan)
            jeng: 0.033,           // 1 m = 0.033 정 (Jeng)
            li: 0.0000025,         // 1 m = 0.0000025 리 (Li)
            knot: 0.00053996       // 1 m = 0.00053996 knot
        };

        const cmValue = inputValue / conversionRates[unit];

        document.getElementById('mm').value = (cmValue * conversionRates.mm).toFixed(10);
        document.getElementById('cm').value = (cmValue * conversionRates.cm).toFixed(10);
        document.getElementById('m').value = (cmValue * conversionRates.m).toFixed(10);
        document.getElementById('km').value = (cmValue * conversionRates.km).toFixed(10);
        document.getElementById('inch').value = (cmValue * conversionRates.inch).toFixed(10);
        document.getElementById('feet').value = (cmValue * conversionRates.feet).toFixed(10);
        document.getElementById('yard').value = (cmValue * conversionRates.yard).toFixed(10);
        document.getElementById('mile').value = (cmValue * conversionRates.mile).toFixed(10);
        document.getElementById('ja').value = (cmValue * conversionRates.ja).toFixed(10);
        document.getElementById('gan').value = (cmValue * conversionRates.gan).toFixed(10);
        document.getElementById('jeng').value = (cmValue * conversionRates.jeng).toFixed(10);
        document.getElementById('li').value = (cmValue * conversionRates.li).toFixed(10);
        document.getElementById('knot').value = (cmValue * conversionRates.knot).toFixed(10);
    }

    

    function convertWeight() {
        const inputValue = parseFloat(document.getElementById('weightInput').value);
        const unit = document.getElementById('weightUnit').value;
    
        // 각 단위에 대한 변환 비율을 정의합니다.
        const conversionRates = {
            mg: 1000000,          // 1 kg = 1,000,000 mg (밀리그램)
            g: 1000,              // 1 kg = 1,000 g (그램)
            kg: 1,                // 1 kg = 1 kg (킬로그램)
            ton: 0.001,           // 1 kg = 0.001 ton (톤)
            grain: 15432.4,       // 1 kg = 15,432.4 grain (그레인)
            ounce: 35.274,        // 1 kg = 35.274 ounce (온스)
            pound: 2.20462,       // 1 kg = 2.20462 pound (파운드)
            stone: 0.157473,      // 1 kg = 0.157473 stone (스톤)
            don: 266.667,         // 1 kg = 266.667 don (돈)
            gun: 1.66667,         // 1 kg = 1.66667 gun (근)
            guan: 0.266667,       // 1 kg = 0.266667 guan (관)
            nyang: 26.67          // 1 kg = 26.67 nyang (냥)
        };
        
    
        // 입력값을 기준 단위인 그램(g)으로 변환합니다.
        const gValue = inputValue / conversionRates[unit];
    
        // 각 단위로 변환하여 값을 출력합니다. 소수점 10자리까지 표시합니다.
        document.getElementById('mg').value = (gValue * conversionRates.mg).toFixed(10);
        document.getElementById('g').value = (gValue * conversionRates.g).toFixed(10);
        document.getElementById('kg').value = (gValue * conversionRates.kg).toFixed(10);
        document.getElementById('ton').value = (gValue * conversionRates.ton).toFixed(10);
        document.getElementById('grain').value = (gValue * conversionRates.grain).toFixed(10);
        document.getElementById('ounce').value = (gValue * conversionRates.ounce).toFixed(10);
        document.getElementById('pound').value = (gValue * conversionRates.pound).toFixed(10);
        document.getElementById('stone').value = (gValue * conversionRates.stone).toFixed(10);
        document.getElementById('don').value = (gValue * conversionRates.don).toFixed(10);
        document.getElementById('gun').value = (gValue * conversionRates.gun).toFixed(10);
        document.getElementById('guan').value = (gValue * conversionRates.guan).toFixed(10);
        document.getElementById('nyang').value = (gValue * conversionRates.nyang).toFixed(10);
    }

    

    function convertArea() {
        const inputValue = parseFloat(document.getElementById('areaInput').value);
        const unit = document.getElementById('areaUnit').value;
    
        const conversionRates = {
            sqmm: 1000000,             // 1 제곱미터(㎡) = 1,000,000 제곱밀리미터(㎟)
            sqcm: 10000,               // 1 제곱미터(㎡) = 10,000 제곱센티미터(㎠)
            sqm: 1,                    // 1 제곱미터(㎡) = 1 ㎡
            are: 0.01,                 // 1 제곱미터(㎡) = 0.01 아르(are)
            sqkm: 0.000001,            // 1 제곱미터(㎡) = 0.000001 제곱킬로미터(㎢)
            pyong: 0.3025,             // 1 제곱미터(㎡) = 0.3025  평방자(평방尺)
            py: 3.3058,                // 1 제곱미터(㎡) = 3.3058  평(坪)
            danbo: 0.001008,           // 1 제곱미터(㎡) = 0.001008 단보(段步)
            jeongbo: 0.0001008,        // 1 제곱미터(㎡) = 0.0001008 정보(町步)
            sqft: 10.7639,             // 1 제곱미터(㎡) = 10.7639 평방피트(ft²)
            sqyd: 1.19599,             // 1 제곱미터(㎡) = 1.19599 평방야드(yd²)
            acre: 0.000247105          // 1 제곱미터(㎡) = 0.000247105 에이커(ac)
        };
        
        
    
        const sqmValue = inputValue / conversionRates[unit]; // 제곱미터(㎡) 기준으로 변환
    
        document.getElementById('sqmm').value = (sqmValue * conversionRates.sqmm).toFixed(10);
        document.getElementById('sqcm').value = (sqmValue * conversionRates.sqcm).toFixed(10);
        document.getElementById('sqm').value = (sqmValue * conversionRates.sqm).toFixed(10);
        document.getElementById('are').value = (sqmValue * conversionRates.are).toFixed(10);
        document.getElementById('sqkm').value = (sqmValue * conversionRates.sqkm).toFixed(10);
        document.getElementById('pyong').value = (sqmValue * conversionRates.pyong).toFixed(10);
        document.getElementById('py').value = (sqmValue * conversionRates.py).toFixed(10);
        document.getElementById('danbo').value = (sqmValue * conversionRates.danbo).toFixed(10);
        document.getElementById('jeongbo').value = (sqmValue * conversionRates.jeongbo).toFixed(10);
        document.getElementById('sqft').value = (sqmValue * conversionRates.sqft).toFixed(10);
        document.getElementById('sqyd').value = (sqmValue * conversionRates.sqyd).toFixed(10);
        document.getElementById('acre').value = (sqmValue * conversionRates.acre).toFixed(10);
    }
    
    

    function convertVolume() {
        const inputValue = parseFloat(document.getElementById('volumeInput').value);
        const unit = document.getElementById('volumeUnit').value;
    
        const conversionRates = {
            ccmm: 1000000000,          // 1 세제곱미터(㎥) = 1,000,000,000 세제곱밀리미터(㎣)
            ccm: 1000000,              // 1 세제곱미터(㎥) = 1,000,000 세제곱센티미터(㎤)
            cbm: 1,                    // 1 세제곱미터(㎥) = 1 ㎥
            ml: 1000000,               // 1 세제곱미터(㎥) = 1,000,000 밀리리터(mL)
            liter: 1000,               // 1 세제곱미터(㎥) = 1,000 리터(L)
            cubicInch: 61023.7441,     // 1 세제곱미터(㎥) = 61,023.7441 세제곱인치(in³)
            cubicFeet: 35.3147,        // 1 세제곱미터(㎥) = 35.3147 세제곱피트(ft³)
            cubicYard: 1.30795,        // 1 세제곱미터(㎥) = 1.30795 세제곱야드(yd³)
            hob: 556.035,              // 1 세제곱미터(㎥) = 556.035 홉
            doe: 55.6035,              // 1 세제곱미터(㎥) = 55.6035 되
            mal: 5.56035,              // 1 세제곱미터(㎥) = 5.56035 말
            gallon: 264.172,           // 1 세제곱미터(㎥) = 264.172 갤런(gal)
            quart: 1056.688,           // 1 세제곱미터(㎥) = 1,056.688 쿼트(quart)
            pint: 2113.376,            // 1 세제곱미터(㎥) = 2,113.376 파인트(pint)
            fl_oz: 33814.02,           // 1 세제곱미터(㎥) = 33,814.02 액량온스(fl oz)
            barrel: 6.2898             // 1 세제곱미터(㎥) = 6.2898 배럴(bbl)
        };
    
        const cbmValue = inputValue / conversionRates[unit]; // 입력값을 세제곱미터(㎥)로 변환
    
        document.getElementById('ccmm').value = (cbmValue * conversionRates.ccmm).toFixed(10); // 세제곱밀리미터
        document.getElementById('ccm').value = (cbmValue * conversionRates.ccm).toFixed(10);   // 세제곱센티미터
        document.getElementById('cbm').value = (cbmValue * conversionRates.cbm).toFixed(10);   // 세제곱미터
        document.getElementById('ml').value = (cbmValue * conversionRates.ml).toFixed(10);     // 밀리리터
        document.getElementById('liter').value = (cbmValue * conversionRates.liter).toFixed(10); // 리터
        document.getElementById('cubicInch').value = (cbmValue * conversionRates.cubicInch).toFixed(10); // 세제곱인치
        document.getElementById('cubicFeet').value = (cbmValue * conversionRates.cubicFeet).toFixed(10); // 세제곱피트
        document.getElementById('cubicYard').value = (cbmValue * conversionRates.cubicYard).toFixed(10); // 세제곱야드
        document.getElementById('hob').value = (cbmValue * conversionRates.hob).toFixed(10);   // 홉
        document.getElementById('doe').value = (cbmValue * conversionRates.doe).toFixed(10);   // 되
        document.getElementById('mal').value = (cbmValue * conversionRates.mal).toFixed(10);   // 말
        document.getElementById('gallon').value = (cbmValue * conversionRates.gallon).toFixed(10); // 갤런
        document.getElementById('quart').value = (cbmValue * conversionRates.quart).toFixed(10); // 쿼트
        document.getElementById('pint').value = (cbmValue * conversionRates.pint).toFixed(10);   // 파인트
        document.getElementById('fl_oz').value = (cbmValue * conversionRates.fl_oz).toFixed(10); // 액량온스
        document.getElementById('barrel').value = (cbmValue * conversionRates.barrel).toFixed(10); // 배럴
    }
    

    document.getElementById("lengthConvertButton").addEventListener("click", convertLength);
    document.getElementById("weightConvertButton").addEventListener("click", convertWeight);
    document.getElementById("areaConvertButton").addEventListener("click", convertArea);
    document.getElementById("volumeConvertButton").addEventListener("click", convertVolume);

});
