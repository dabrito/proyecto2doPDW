'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaccions', [
      {
        cantidad: 150.75,
        descripcion: 'Pago de factura de electricidad',
        fecha: new Date('2025-03-01'), // Asegúrate de ajustar la fecha como desees
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cantidad: 500.00,
        descripcion: 'Pago de servicios de internet',
        fecha: new Date('2025-03-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cantidad: 1250.50,
        descripcion: 'Compra de materiales de oficina',
        fecha: new Date('2025-03-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Para revertir, eliminamos todas las transacciones insertadas
    await queryInterface.bulkDelete('transacciones', null, {});
  }
};
