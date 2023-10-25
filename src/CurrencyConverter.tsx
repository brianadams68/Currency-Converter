import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch exchange rates from an API (e.g., exchangeratesapi.io)
    fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&apikey=${CURRENCY_CONVERTER}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.rates && data.rates[toCurrency]) {
          setExchangeRate(data.rates[toCurrency]);
        } else {
          setExchangeRate(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
        setExchangeRate(null);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount(amount * exchangeRate);
    } else {
      setConvertedAmount(null);
    }
  }, [amount, exchangeRate]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Currency Converter</h2>
      <div className="flex flex-col">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2 mb-2"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2 mb-2"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currency options as needed */}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 mb-2"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          {/* Add more currency options as needed */}
        </select>
      </div>
      {exchangeRate !== null ? (
        <p className="mt-2">
          {amount} {fromCurrency} is approximately{' '}
          {convertedAmount?.toFixed(2)} {toCurrency}
        </p>
      ) : (
        <p className="text-red-600 mt-2">Unable to fetch exchange rate data.</p>
      )}
    </div>
  );
};

export default CurrencyConverter;
