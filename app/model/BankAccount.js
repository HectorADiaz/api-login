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
  bankId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Bank',  
      key: 'bankId'
    }
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'AccountType',  
      key: 'accountTypeId'
    }
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
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'bankAccounts',
  timestamps: false,
});

 
module.exports = BankAccount;
