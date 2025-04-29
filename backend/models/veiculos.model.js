const sequelize = require("sequelize");
const conexao = require("../config/database");
//boas
let Veiculos = conexao.define(
  "veiculos",
  {
    nome: {
      type: sequelize.STRING,
      allowNull: false,
    },
    matricula: {
      type: sequelize.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    marca: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    modelo: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    cor: {
      type: sequelize.STRING,
      allowNull: false,
    },
    nif: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "veiculos",
    timestamps: true,
  }
);

module.exports = Veiculos;
