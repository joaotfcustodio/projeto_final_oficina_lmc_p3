const Veiculos = require("../models/veiculos.model");
const Clientes = require("../models/clientes.model");
const Reparacoes = require("../models/reparacoes.model");

const veiculosController = {};

// Criar veículo e associar a um cliente
veiculosController.createVeiculo = async (req, res) => {
  const { matricula, marca, modelo, cor, clienteNif } = req.body;

  try {
    const cliente = await Clientes.findByPk(clienteNif);
    if (!cliente) {
      return res
        .status(404)
        .json({ status: "error", message: "Cliente não encontrado." });
    }

    const veiculo = await Veiculos.create({ matricula, marca, modelo, cor });
    await veiculo.addCliente(cliente);

    res.status(201).json({
      status: "success",
      message: "Veículo criado e associado ao cliente com sucesso.",
      data: veiculo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar o veículo.",
      details: error.message,
    });
  }
};

// Obter todos os veículos
veiculosController.getAllVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculos.findAll({
      include: [
        {
          model: Clientes,
          as: "clientes",
          through: { attributes: [] },
          attributes: ["nif", "nome"],
        },
        {
          model: Reparacoes,
          as: "reparacoes",
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Lista de veículos.",
      data: veiculos,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao obter veículos.",
      details: error.message,
    });
  }
};

// Obter veículos por cliente
veiculosController.getVeiculosByCliente = async (req, res) => {
  const { nif } = req.params;

  try {
    const cliente = await Clientes.findByPk(nif, {
      include: {
        model: Veiculos,
        as: "veiculos",
        include: [
          {
            model: Reparacoes,
            as: "reparacoes",
          },
        ],
        through: { attributes: [] },
      },
    });

    if (!cliente) {
      return res
        .status(404)
        .json({ status: "error", message: "Cliente não encontrado." });
    }

    const veiculosCompletos = cliente.veiculos.map((veiculo) => ({
      matricula: veiculo.matricula,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      cor: veiculo.cor,
      cliente: {
        nif: cliente.nif,
        nome: cliente.nome,
      },
      reparacoes: veiculo.reparacoes,
    }));

    res.status(200).json({
      status: "success",
      message: "Veículos encontrados.",
      data: veiculosCompletos,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar veículos do cliente.",
      details: error.message,
    });
  }
};

// Obter veículo por matrícula
veiculosController.getVeiculoByMatricula = async (req, res) => {
  const { matricula } = req.params;

  try {
    const veiculo = await Veiculos.findByPk(matricula, {
      include: [
        {
          model: Clientes,
          as: "clientes",
          through: { attributes: [] },
          attributes: ["nif", "nome"],
        },
        {
          model: Reparacoes,
          as: "reparacoes",
        },
      ],
    });

    if (!veiculo) {
      return res
        .status(404)
        .json({ status: "error", message: "Veículo não encontrado." });
    }

    res.status(200).json({
      status: "success",
      message: "Veículo encontrado.",
      data: veiculo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao buscar o veículo.",
      details: error.message,
    });
  }
};

// Criar reparação associada a um veículo
veiculosController.createReparacao = async (req, res) => {
  const { matricula } = req.params;
  const reparacaoData = req.body;

  try {
    const veiculo = await Veiculos.findByPk(matricula);
    if (!veiculo) {
      return res
        .status(404)
        .json({ status: "error", message: "Veículo não encontrado." });
    }

    const novaReparacao = await Reparacoes.create({
      ...reparacaoData,
      matricula,
    });

    res.status(201).json({
      status: "success",
      message: "Reparação criada com sucesso.",
      data: novaReparacao,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar a reparação.",
      details: error.message,
    });
  }
};

// Editar uma reparação existente
veiculosController.updateReparacao = async (req, res) => {
  const { id_reparacao } = req.params;
  const updateData = req.body;

  try {
    const reparacao = await Reparacoes.findByPk(id_reparacao);
    if (!reparacao) {
      return res
        .status(404)
        .json({ status: "error", message: "Reparação não encontrada." });
    }

    await reparacao.update(updateData);

    res.status(200).json({
      status: "success",
      message: "Reparação atualizada com sucesso.",
      data: reparacao,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar a reparação.",
      details: error.message,
    });
  }
};

// Apagar uma reparação
veiculosController.deleteReparacao = async (req, res) => {
  const { id_reparacao } = req.params;

  try {
    const deleted = await Reparacoes.destroy({ where: { id_reparacao } });

    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", message: "Reparação não encontrada." });
    }

    res.status(200).json({
      status: "success",
      message: "Reparação apagada com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao apagar a reparação.",
      details: error.message,
    });
  }
};

module.exports = veiculosController;
