const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = '2dfc4f27f1c8c94842dba3872ff2123c';
const BASE_URL = 'https://api.exchangerate.host';

router.get('/list', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/list?access_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener lista de monedas' });
  }
});

router.get('/live', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/live?access_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener tasas de cambio' });
  }
});

module.exports = router;
