// models/entityAccount.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provider = require('./provider');
const BankAccount = require('./bankAccount');

const EntityAccount = sequelize.define('EntityAccount', {
  entityAccountsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdBy: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
  },
  updatedBy: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'EntityAccounts',
  timestamps: false,
});

// Relaciones
EntityAccount.belongsTo(Provider, { foreignKey: 'providersId', onDelete: 'CASCADE' });
EntityAccount.belongsTo(BankAccount, { foreignKey: 'bankAccountId', onDelete: 'CASCADE' });

module.exports = EntityAccount;
