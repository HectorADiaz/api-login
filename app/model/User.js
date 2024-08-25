const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', 
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                  msg: 'The username is required.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                  msg: 'The email format is invalid.'
                },
                notEmpty: {
                  msg: 'The email is required.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Roles', // Esto hace referencia al nombre de la tabla
                key: 'id'
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
            model: 'users',
            key: 'id'
            }
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
            model: 'users',
            key: 'id'
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
        createdAt: 'createdAt',
        onUpdate: DataTypes.NOW
    }
);

module.exports = User;
