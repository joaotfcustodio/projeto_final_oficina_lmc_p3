const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Utilizador = sequelize.define(
  "Utilizador",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "utilizadores",
    timestamps: false,
  }
);

module.exports = Utilizador;
