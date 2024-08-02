document.addEventListener('DOMContentLoaded', function () {
    function setupDropdown(selectElement, selectedElement, dropdownElement) {
        const options = selectElement.options;

        // Populate custom dropdown
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const optionElement = document.createElement('div');
            optionElement.innerHTML = `<img src="${option.getAttribute('data-flag')}" alt="${option.text}"> ${option.text}`;
            optionElement.addEventListener('click', function () {
                selectElement.selectedIndex = i;
                selectedElement.innerHTML = optionElement.innerHTML;
                dropdownElement.style.display = 'none';
                updateFlag(selectElement, selectedElement.querySelector('img'));
            });
            dropdownElement.appendChild(optionElement);
        }

        // Toggle dropdown visibility
        selectedElement.addEventListener('click', function () {
            dropdownElement.style.display = dropdownElement.style.display === 'block' ? 'none' : 'block';
        });
    }

    function updateFlag(selectElement, flagElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        flagElement.src = selectedOption.getAttribute('data-flag');
    }

    const currencyOne = document.getElementById('currencyOne');
    const currencyTwo = document.getElementById('currencyTwo');
    const currencyOneSelected = document.getElementById('currencyOne-selected');
    const currencyTwoSelected = document.getElementById('currencyTwo-selected');
    const currencyOneDropdown = document.getElementById('currencyOne-dropdown');
    const currencyTwoDropdown = document.getElementById('currencyTwo-dropdown');

    setupDropdown(currencyOne, currencyOneSelected, currencyOneDropdown);
    setupDropdown(currencyTwo, currencyTwoSelected, currencyTwoDropdown);

    // Initialize flags
    updateFlag(currencyOne, currencyOneSelected.querySelector('img'));
    updateFlag(currencyTwo, currencyTwoSelected.querySelector('img'));
});