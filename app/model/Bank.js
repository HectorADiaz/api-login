const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bank = sequelize.define('Bank', { //Nombre en singular 
  bankId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  bankName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'banks', // Por defecto, Sequelize genera el nombre de la tabla en plural a partir del nombre del modelo.
  timestamps: false,
});

module.exports = Bank;
