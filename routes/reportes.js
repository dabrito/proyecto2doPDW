const express = require('express');
const router = express.Router();
const { Transaccion } = require('../models');

router.get('/', async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();

    const agrupadoPorMes = {};
    const ingresosPorCategoria = {};
    const gastosPorCategoria = {};
    let totalIngresos = 0;
    let totalGastos = 0;

    transacciones.forEach(t => {
      const fecha = new Date(t.date);
      const mes = fecha.getMonth(); // 0 = enero

      if (!agrupadoPorMes[mes]) {
        agrupadoPorMes[mes] = { ingresos: 0, gastos: 0 };
      }

      if (t.type === 'ingreso') {
        agrupadoPorMes[mes].ingresos += t.amount;
        totalIngresos += t.amount;

        const cat = `Categoría ${t.categoryId}`;
        ingresosPorCategoria[cat] = (ingresosPorCategoria[cat] || 0) + t.amount;
      } else {
        agrupadoPorMes[mes].gastos += t.amount;
        totalGastos += t.amount;

        const cat = `Categoría ${t.categoryId}`;
        gastosPorCategoria[cat] = (gastosPorCategoria[cat] || 0) + t.amount;
      }
    });

    const meses = Object.keys(agrupadoPorMes).map(i =>
      new Date(0, i).toLocaleString('default', { month: 'short' })
    );
    const ingresosMensuales = Object.values(agrupadoPorMes).map(v => v.ingresos);
    const gastosMensuales = Object.values(agrupadoPorMes).map(v => v.gastos);

    const todasLasCategorias = [
      ...new Set([
        ...Object.keys(ingresosPorCategoria),
        ...Object.keys(gastosPorCategoria)
      ])
    ];

    const ingresosCat = todasLasCategorias.map(cat => ingresosPorCategoria[cat] || 0);
    const gastosCat = todasLasCategorias.map(cat => gastosPorCategoria[cat] || 0);

    const reportData = {
      line: {
        labels: meses,
        ingresos: ingresosMensuales,
        gastos: gastosMensuales
      },
      totales: {
        ingresos: totalIngresos,
        gastos: totalGastos
      },
      categorias: {
        labels: todasLasCategorias,
        ingresos: ingresosCat,
        gastos: gastosCat
      }
    };

    res.render('reportes', { reportData });
  } catch (err) {
    console.error('Error al generar reportes:', err);
    res.status(500).send('Error al cargar reportes');
  }
});

module.exports = router;
