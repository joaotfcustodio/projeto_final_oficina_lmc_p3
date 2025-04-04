const sequelize = require("sequelize");
const conexao = require("../config/database");

let Clientes = conexao.define(
  "clientes",
  {
    nome: {
      type: sequelize.STRING,
      allowNull: false,
    },
    morada: {
      type: sequelize.STRING,
      allowNull: true,
    },
    nif: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    contacto: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    data_registo: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "clientes",
    timestamps: true,
  }
);

module.exports = Clientes;
