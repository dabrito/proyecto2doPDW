'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class transaccion extends Model {
    static associate(models) {
      // define association here
    }
  }
  transaccion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: DataTypes.DOUBLE,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaccion',
    tableName: 'transaccions',
    timestamps: true
  });
  return transaccion;
};