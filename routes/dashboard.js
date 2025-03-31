var express = require('express');
var router = express.Router();


// Ruta para mostrar todo lo del dashboard
router.get('/', function(req, res, next) {
    res.render('dashboard', { title: 'Formulario de Suscripción' });
  });

module.exports = router;
