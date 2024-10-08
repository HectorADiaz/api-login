// models/provider.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EntityAccount = require('../model/EntityAccount');

const Provider = sequelize.define('Provider', {
  providersId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commercialName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fiscalAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  managerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  managerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  }
}, {
  tableName: 'providers',
  timestamps: false,
});


module.exports = Provider;
