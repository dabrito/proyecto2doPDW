const express = require('express');
const router = express.Router();
const { Transaccion, Categoria } = require('../models');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaccion.findAll({
      include: { model: Categoria, as: 'categoria' },
      order: [['id', 'DESC']],
    });

    res.render('billeteras', { transactions });
  } catch (err) {
    res.status(500).send('Error al cargar billeteras');
  }
});

router.post('/delete', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).send('ID no válido');

  try {
    await Transaccion.destroy({ where: { id } });
    res.redirect('/billeteras');
  } catch (err) {
    res.status(500).send('Error al eliminar');
  }
});

module.exports = router;
