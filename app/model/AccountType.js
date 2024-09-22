const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountType = sequelize.define('AccountType', {
  accountTypeId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  typeName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'accountTypes',
  timestamps: false,
});

module.exports = AccountType;
