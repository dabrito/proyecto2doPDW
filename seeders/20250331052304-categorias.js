'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categoria', [
      {
        tipo: 'ingreso',  // 'ingreso' es uno de los valores válidos
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'gasto',  // 'gasto' es otro valor válido
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Para revertir, eliminamos las categorías insertadas
    await queryInterface.bulkDelete('categorias', null, {});
  }
};

