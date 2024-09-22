const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bank = require('../model/Bank');
const AccountType = require('./accountType');

const BankAccount = sequelize.define('BankAccount', {
  bankAccountId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  accountNumber: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  accountName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  typeAccounts: {
    type: DataTypes.ENUM('propietary', 'provider'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.TIMESTAMP,
    allowNull: true,
  },
}, {
  tableName: 'bankAccounts',
  timestamps: false,
});

// Relaciones
BankAccount.belongsTo(Bank, { foreignKey: 'bankId', onDelete: 'CASCADE' });
BankAccount.belongsTo(AccountType, { foreignKey: 'accountTypeId', onDelete: 'CASCADE' });

module.exports = BankAccount;
