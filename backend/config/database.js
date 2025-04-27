const sequelize = require("sequelize");
const conexao = new sequelize("projeto_final_p3", "root", "123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
}); // nome da base de dados, user e password

module.exports = conexao;
