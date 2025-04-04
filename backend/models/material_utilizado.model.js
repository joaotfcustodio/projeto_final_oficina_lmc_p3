const sequelize = require("sequelize");
const conexao = require("../config/database");

let MaterialUtilizado = conexao.define(
  "material_utilizado",
  {
    id_material_utilizado: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    preco_verniz_carro: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    quantidade_gasoleo_estufa: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    quantidade_tinta_jantes: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    quantidade_verniz: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    preco_gasoleo_estufa_lt: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    preco_total_material_carro: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    massa_polimento: {
      type: sequelize.STRING,
      allowNull: true,
    },
    quantidade_tinta: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    preco_tinta_carro: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
    marca_verniz: {
      type: sequelize.STRING,
      allowNull: true,
    },
    matricula: {
      type: sequelize.STRING,
      allowNull: true,
    },
    marca_tinta: {
      type: sequelize.STRING,
      allowNull: true,
    },
    id_reparacao: {
      type: sequelize.NUMBER,
      autoIncrement: true,
      allowNull: false,
    },
    preco_tinta_jantes: {
      type: sequelize.NUMBER,
      allowNull: true,
    },
  },
  {
    tableName: "material_utilizado",
    timestamps: true,
  }
);

module.exports = MaterialUtilizado;
