const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ClientesVeiculos = sequelize.define(
  "ClientesVeiculos",
  {
    clienteNif: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "clientes",
        key: "nif",
      },
    },
    veiculoMatricula: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "veiculos",
        key: "matricula",
      },
    },
  },
  {
    tableName: "clientes_veiculos",
    timestamps: false,
  }
);

module.exports = ClientesVeiculos;
