const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Clientes = sequelize.define(
  "Cliente",
  {
    nif: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    morada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_registo: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "clientes",
    timestamps: false,
  }
);

module.exports = Clientes;
