// models/provider.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
  providersId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  businessName: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  commercialName: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  fiscalAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  managerName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  managerPhone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
  tableName: 'providers',
  timestamps: false,
});

module.exports = Provider;
