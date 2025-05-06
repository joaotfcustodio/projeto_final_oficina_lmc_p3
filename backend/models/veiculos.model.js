const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Veiculo = sequelize.define(
  "Veiculo",
  {
    matricula: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "veiculos",
    timestamps: false,
  }
);

module.exports = Veiculo;
