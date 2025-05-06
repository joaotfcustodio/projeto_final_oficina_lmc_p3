const Veiculo = require("../models/veiculos.model");
const Cliente = require("../models/clientes.model");
const Reparacao = require("../models/reparacoes.model");
const MaterialUtilizado = require("../models/material_utilizado.model");

const endpointsFunction = {};

// Criar veículo e associar a cliente existente por NIF
endpointsFunction.createVeiculo = async (req, res) => {
  try {
    const { matricula, marca, modelo, cor, nif } = req.body;

    const cliente = await Cliente.findOne({ where: { nif } });

    if (!cliente) {
      return res.status(404).json({
        status: "error",
        message: "Cliente com o NIF indicado não existe.",
      });
    }

    const veiculo = await Veiculo.create({ matricula, marca, modelo, cor });
    await veiculo.addCliente(cliente);

    res.status(201).json({
      status: "success",
      message: "Veículo criado com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar veículo.",
      error: err.message,
    });
  }
};

// Obter veículo por matrícula, incluindo reparações e material utilizado
endpointsFunction.getVeiculoByMatricula = async (req, res) => {
  try {
    const { matricula } = req.params;

    const veiculo = await Veiculo.findByPk(matricula, {
      include: [
        {
          model: Cliente,
          attributes: ["nif", "nome"],
          through: { attributes: [] },
        },
        {
          model: Reparacao,
          include: [
            {
              model: MaterialUtilizado,
            },
          ],
        },
      ],
    });

    if (!veiculo) {
      return res.status(404).json({
        status: "error",
        message: "Veículo não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      veiculo,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao obter veículo.",
      error: err.message,
    });
  }
};

// Atualizar dados de um veículo
endpointsFunction.updateVeiculo = async (req, res) => {
  try {
    const { matricula } = req.params;
    const { marca, modelo, cor } = req.body;

    const veiculo = await Veiculo.findByPk(matricula);
    if (!veiculo) {
      return res.status(404).json({
        status: "error",
        message: "Veículo não encontrado.",
      });
    }

    await veiculo.update({ marca, modelo, cor });

    res.status(200).json({
      status: "success",
      message: "Veículo atualizado com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar veículo.",
      error: err.message,
    });
  }
};

// Eliminar veículo
endpointsFunction.deleteVeiculo = async (req, res) => {
  try {
    const { matricula } = req.params;

    const veiculo = await Veiculo.findByPk(matricula);
    if (!veiculo) {
      return res.status(404).json({
        status: "error",
        message: "Veículo não encontrado.",
      });
    }

    await veiculo.destroy();

    res.status(200).json({
      status: "success",
      message: "Veículo eliminado com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao eliminar veículo.",
      error: err.message,
    });
  }
};

module.exports = endpointsFunction;
