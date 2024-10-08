const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccountType = sequelize.define('AccountType', {
  accountTypeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'accountTypes',
  timestamps: false,
});

module.exports = AccountType;
