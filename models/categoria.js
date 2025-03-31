'use strict';

module.exports = (sequelize, DataTypes) => {
  const categoria = sequelize.define('categoria', {
    // Definir atributos del modelo categoria
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  categoria.associate = function(models) {
    // Si se quiere acceder desde categoria hacia transaccion
    categoria.hasOne(models.transaccion, { foreignKey: 'id_categoria' });
  };

  return categoria;
};
