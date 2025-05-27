const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Veiculo = sequelize.define(
  "Veiculo",
  {
    matricula: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      set(value) {
        this.setDataValue("matricula", value.toUpperCase());
      },
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
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear() + 1,
      },
    },
  },
  {
    tableName: "veiculos",
    timestamps: false,
  }
);

module.exports = Veiculo;
