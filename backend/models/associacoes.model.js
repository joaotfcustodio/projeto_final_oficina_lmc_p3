const Cliente = require("./clientes.model");
const Veiculo = require("./veiculos.model");
const Reparacao = require("./reparacoes.model");
const MaterialUtilizado = require("./material_utilizado.model");
const ClientesVeiculos = require("./clientes_veiculos.model");

// Cliente <-> Veiculo (N:M)
Cliente.belongsToMany(Veiculo, {
  through: ClientesVeiculos,
  foreignKey: "clienteNif",
  otherKey: "veiculoMatricula",
  as: "veiculos",
});

Veiculo.belongsToMany(Cliente, {
  through: ClientesVeiculos,
  foreignKey: "veiculoMatricula",
  otherKey: "clienteNif",
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
