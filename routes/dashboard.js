const express = require('express');
const router = express.Router();
const { Transaccion, Categoria } = require('../models');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaccion.findAll({
      include: { model: Categoria, as: 'categoria' },
      order: [['id', 'DESC']],
    });

    const categorias = await Categoria.findAll();

    let ingresos = 0;
    let gastos = 0;

    transactions.forEach(t => {
      if (t.type === 'ingreso') ingresos += t.amount;
      if (t.type === 'gasto') gastos += t.amount;
    });

    const today = new Date().toISOString().split('T')[0];

    res.render('dashboard', {
      transactions,
      categorias,
      ingresos,
      gastos,
      total: ingresos - gastos,
      today
    });
  } catch (err) {
    console.error('Error al cargar dashboard:', err);
    res.status(500).send('Error al cargar dashboard');
  }
});

router.post('/', async (req, res) => {
  try {
    const { type, amount, categoryId, date } = req.body;

    if (!type || !amount || !categoryId || !date) {
      return res.send('Faltan campos');
    }

    await Transaccion.create({
      type,
      amount: parseFloat(amount),
      categoryId: parseInt(categoryId),
      date,
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error al crear transacción:', err);
    res.status(500).send('Error al crear transacción');
  }
});

module.exports = router;
