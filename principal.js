document.addEventListener('DOMContentLoaded', () => {
    const currencyUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // URL de la API

    // Elementos del DOM
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const resultDisplay = document.getElementById('result');

    // Obtener y mostrar las opciones de monedas
    fetch(currencyUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            populateCurrencyOptions(currencies, fromCurrencySelect);
            populateCurrencyOptions(currencies, toCurrencySelect);
        })
        .catch(error => console.error('Error fetching currency data:', error));

    // Función para rellenar el menú de opciones de monedas
    function populateCurrencyOptions(currencies, selectElement) {
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            selectElement.appendChild(option);
        });
    }

    // Evento de conversión
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount)) {
            resultDisplay.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`${currencyUrl}?base=${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching conversion rate:', error));
    });
});
