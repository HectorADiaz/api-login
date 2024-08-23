
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Users', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                  msg: 'The username is required.'
                },
                len: {
                  args: [3, 50],
                  msg: 'The username must be between 3 and 50 characters long.'
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
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'The password is required.'
                },
                len: {
                  args: [8, 255],
                  msg: 'The password must be at least 8 characters long.'
                }
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
            model: 'roles',
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
        timestamps: true, // Esto maneja automáticamente createdAt y updatedAt
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
        onUpdate: DataTypes.NOW // Para mantener updatedAt sincronizado
    }
);

module.exports = User;