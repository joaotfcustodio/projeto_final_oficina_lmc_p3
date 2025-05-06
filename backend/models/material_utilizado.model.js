const { DataTypes } = require("sequelize");
const conexao = require("../config/database");

const MaterialUtilizado = conexao.define(
  "material_utilizado",
  {
    id_material_utilizado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_reparacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // 1:1 com reparação
      references: {
        model: "reparacoes",
        key: "id_reparacao",
      },
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marca_tinta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantidade_tinta: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    marca_verniz: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantidade_verniz: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    massa_polimento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco_gasoleo_estufa_lt: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    preco_gasoleo_estufa_total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantidade_tinta_jantes: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    preco_verniz_carro: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    preco_tinta_carro: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    preco_tinta_jantes: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    preco_total_material_carro: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "material_utilizado",
    timestamps: true,
  }
);

module.exports = MaterialUtilizado;
