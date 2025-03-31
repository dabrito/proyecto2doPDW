var express = require('express');
var router = express.Router();
const { transaccion } = require('../models');

router.get('/', async function(req, res, next) {
  try {
    const transacciones = await transaccion.findAll();

    res.render('transacciones', { 
      title: 'Transacciones',
      transacciones: transacciones 
    });
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).send('Error al obtener datos');
  }
});

module.exports = router;