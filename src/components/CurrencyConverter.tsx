import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const apiKey = process.env.REACT_APP_CURRENCY_CONVERTER;
  const symbols = 'USD,EUR,AUD,CAD,PLN,MXN,GBP';

  useEffect(() => {
    fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&symbols=${symbols}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log("API Response:", data); // Log the entire API response
        if (data.data && data.data[toCurrency]) {
          setExchangeRate(data.data[toCurrency]);
        } else {
          setExchangeRate(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        setExchangeRate(null);
      });
      // eslint-disable-next-line
  }, [fromCurrency, toCurrency]);
  

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount(amount * exchangeRate); 
    } else {
      setConvertedAmount(null);
    }
  }, [amount, exchangeRate, apiKey]);
  

  return (
    <div className="test p-4 ml-10 border border-sky-500">
      <h2 className="text-2xl font-semibold mb-2">Currency Converter</h2>
      <div className="flex flex-col">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="from border p-2 mb-2"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="PLN">PLN</option>
          <option value="MXN">MXN</option>
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="to border p-2 mb-2"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="PLN">PLN</option>
          <option value="MXN">MXN</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2 mb-2"
        />
      </div>
      {exchangeRate !== null ? (
        <p className="mt-2">
          {amount} {fromCurrency} is approximately {convertedAmount?.toFixed(2)}{" "}
          {toCurrency}
        </p>
      ) : (
        <p className="text-red-600 mt-2">Unable to fetch exchange rate data.</p>
      )}
    </div>
  );
};

export default CurrencyConverter;

