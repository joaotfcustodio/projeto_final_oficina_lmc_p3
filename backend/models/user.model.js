const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "user",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: true,
  }
);

// Hash da password antes de criar
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Hash da nova password antes de atualizar (caso tenha sido alterada)
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Método de instância para verificar password
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
