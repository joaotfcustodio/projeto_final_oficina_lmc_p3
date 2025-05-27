const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MaterialUtilizado = sequelize.define(
  "MaterialUtilizado",
  {
    id_material_utilizado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_reparacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Relação 1:1 com reparação
      references: {
        model: "reparacoes",
        key: "id_reparacao",
      },
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marca_tinta: DataTypes.STRING,
    quantidade_tinta: DataTypes.FLOAT,
    marca_verniz: DataTypes.STRING,
    quantidade_verniz: DataTypes.FLOAT,
    massa_polimento: DataTypes.STRING,
    preco_gasoleo_estufa_lt: DataTypes.FLOAT,
    preco_gasoleo_estufa_total: DataTypes.FLOAT,
    quantidade_tinta_jantes: DataTypes.FLOAT,
    preco_verniz_carro: DataTypes.FLOAT,
    preco_tinta_carro: DataTypes.FLOAT,
    preco_tinta_jantes: DataTypes.FLOAT,
    preco_total_material_carro: DataTypes.FLOAT,
  },
  {
    tableName: "material_utilizado",
    timestamps: true,
  }
);

module.exports = MaterialUtilizado;
