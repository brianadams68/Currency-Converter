import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const apiKey = process.env.CURRENCY_CONVERTER;
  const symbols = 'USD,EUR,AUD,CAD,PLN,MXN';

  useEffect(() => {
    fetch(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=${symbols}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.rates && data.rates[toCurrency]) {
          setExchangeRate(data.rates[toCurrency]);
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
    <div className=" p-4 ml-10">
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
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="PLN">PLN</option>
          <option value="MXN">MXN</option>
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 mb-2"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="PLN">PLN</option>
          <option value="MXN">MXN</option>
        </select>
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

