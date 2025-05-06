const Cliente = require("./clientes.model");
const Veiculo = require("./veiculos.model");
const Reparacao = require("./reparacoes.model");
const MaterialUtilizado = require("./material_utilizado.model");

// Cliente <-> Veiculo (N:M)
Cliente.belongsToMany(Veiculo, {
  through: "ClienteVeiculo",
  foreignKey: "nif",
  otherKey: "matricula",
  as: "veiculos",
});

Veiculo.belongsToMany(Cliente, {
  through: "ClienteVeiculo",
  foreignKey: "matricula",
  otherKey: "nif",
  as: "clientes",
});

// Veiculo -> Reparacao (1:N)
Veiculo.hasMany(Reparacao, {
  foreignKey: "matricula",
  sourceKey: "matricula",
  as: "reparacoes",
});

Reparacao.belongsTo(Veiculo, {
  foreignKey: "matricula",
  targetKey: "matricula",
});

// Reparacao -> MaterialUtilizado (1:1)
Reparacao.hasOne(MaterialUtilizado, {
  foreignKey: "id_reparacao",
  as: "material_utilizado",
});

MaterialUtilizado.belongsTo(Reparacao, {
  foreignKey: "id_reparacao",
});
