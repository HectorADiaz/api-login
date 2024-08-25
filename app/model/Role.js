const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', 
    {
        roleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                  msg: 'The name is required.'
                },
                len: {
                  args: [3, 50],
                  msg: 'The name must be between 3 and 50 characters long.'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            validate: {
                notEmpty: {
                  msg: 'The description is required.'
                }
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    }
);

module.exports = Role;
