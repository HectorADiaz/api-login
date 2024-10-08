// models/entityAccount.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provider = require('./Provider');
const BankAccount = require('./BankAccount');

const EntityAccount = sequelize.define('EntityAccount', {
  entityAccountsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  providersId: {
     type: DataTypes.INTEGER,
    references: {
      model: 'Provider',
      key: 'providersId'
    }
  },
  bankAccountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'BankAccount',
      key: 'BankAccountid'
    }
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'EntityAccounts',
  timestamps: false,
});

module.exports = EntityAccount;
