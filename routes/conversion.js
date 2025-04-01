const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = '2dfc4f27f1c8c94842dba3872ff2123c';
const BASE_URL = 'https://api.exchangerate.host';

let cache = {
  currencies: [],
  quotes: {}
};

// GET: Mostrar formulario
router.get('/', async (req, res) => {
  try {
    if (cache.currencies.length === 0) {
      const response = await axios.get(`${BASE_URL}/list?access_key=${API_KEY}`);
      const currenciesRes = response.data;

      if (currenciesRes.success) {
        cache.currencies = Object.keys(currenciesRes.currencies);
      }
    }

    res.render('conversion', {
      currencies: cache.currencies,
      amount: null,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      convertedValue: null
    });
  } catch (err) {
    console.error('Error al cargar formulario de conversión:', err);
    res.status(500).send('Error interno al mostrar formulario');
  }
});

// POST: Realizar conversión
router.post('/', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  let convertedValue = null;

  try {
    if (!cache.quotes || Object.keys(cache.quotes).length === 0) {
      const response = await axios.get(`${BASE_URL}/live?access_key=${API_KEY}`);
      const ratesRes = response.data;

      if (ratesRes.success) {
        cache.quotes = ratesRes.quotes;
      }
    }

    let fromToUSD = 1;
    if (fromCurrency !== 'USD') {
      const keyFrom = `USD${fromCurrency}`;
      if (!cache.quotes[keyFrom]) {
        return res.send(`No se encontró tipo de cambio para ${fromCurrency}`);
      }
      fromToUSD = 1 / cache.quotes[keyFrom];
    }

    let usdToTo = 1;
    if (toCurrency !== 'USD') {
      const keyTo = `USD${toCurrency}`;
      if (!cache.quotes[keyTo]) {
        return res.send(`No se encontró tipo de cambio para ${toCurrency}`);
      }
      usdToTo = cache.quotes[keyTo];
    }

    convertedValue = parseFloat(amount) * fromToUSD * usdToTo;

    res.render('conversion', {
      currencies: cache.currencies,
      amount,
      fromCurrency,
      toCurrency,
      convertedValue
    });
  } catch (err) {
    console.error('Error al convertir moneda:', err);
    res.status(500).send('Error en conversión de moneda');
  }
});

module.exports = router;
