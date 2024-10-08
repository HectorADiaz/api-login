const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bank = sequelize.define("Bank", {
    bankId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "banks",  
    timestamps: false,
  }
);

module.exports = Bank;
