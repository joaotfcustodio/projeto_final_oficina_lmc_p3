const Veiculo = require("../models/veiculos.model");
const Cliente = require("../models/clientes.model");
const Reparacao = require("../models/reparacoes.model");
const MaterialUtilizado = require("../models/material_utilizado.model");

const endpointsFunction = {};

// Criar veículo e associar a cliente existente por NIF
endpointsFunction.createVeiculo = async (req, res) => {
  try {
    const { matricula, marca, modelo, cor, ano, nif } = req.body;

    if (!matricula || !marca || !modelo || !cor || !ano || !nif) {
      return res.status(400).json({
        status: "error",
        message: "Todos os campos são obrigatórios.",
      });
    }

    if (!/^[0-9]{4}$/.test(ano.toString())) {
      return res.status(400).json({
        status: "error",
        message: "Ano inválido. Deve conter 4 dígitos.",
      });
    }

    const cliente = await Cliente.findOne({ where: { nif } });
    if (!cliente) {
      return res.status(404).json({
        status: "error",
        message: "Cliente com o NIF indicado não existe.",
      });
    }

    const veiculoExistente = await Veiculo.findByPk(matricula);
    if (veiculoExistente) {
      return res.status(409).json({
        status: "error",
        message: "Já existe um veículo com essa matrícula.",
      });
    }

    const veiculo = await Veiculo.create({
      matricula,
      marca,
      modelo,
      cor,
      ano,
    });
    await veiculo.addCliente(cliente);

    res.status(201).json({
      status: "success",
      message: "Veículo criado com sucesso.",
      data: veiculo,
    });
  } catch (err) {
    console.error("Erro ao criar veículo:", err);
    res.status(500).json({
      status: "error",
      message: "Erro interno no servidor.",
      details: err.message,
    });
  }
};

// Listar todos os veículos com clientes
endpointsFunction.getAllVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      include: [
        {
          model: Cliente,
          as: "clientes",
          attributes: ["nif", "nome"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: veiculos,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao carregar veículos.",
      error: err.message,
    });
  }
};

// Obter veículo por matrícula
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

// Atualizar dados de um veículo e associação ao cliente
endpointsFunction.updateVeiculo = async (req, res) => {
  try {
    const { matricula } = req.params;
    const { marca, modelo, cor, ano, nif } = req.body;

    const veiculo = await Veiculo.findByPk(matricula, {
      include: [{ model: Cliente, as: "clientes" }],
    });

    if (!veiculo) {
      return res.status(404).json({
        status: "error",
        message: "Veículo não encontrado.",
      });
    }

    await veiculo.update({ marca, modelo, cor, ano });

    if (nif) {
      const novoCliente = await Cliente.findOne({ where: { nif } });
      if (!novoCliente) {
        return res.status(404).json({
          status: "error",
          message: "Cliente com esse NIF não encontrado.",
        });
      }

      await veiculo.setClientes([novoCliente]); // Substitui o cliente atual
    }

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

// Eliminar veículo (com desassociação e limpeza completa)
endpointsFunction.deleteVeiculo = async (req, res) => {
  try {
    const { matricula } = req.params;

    const veiculo = await Veiculo.findByPk(matricula, {
      include: [
        { model: Cliente, as: "clientes" },
        {
          model: Reparacao,
          as: "reparacoes",
          include: [{ model: MaterialUtilizado, as: "material_utilizado" }],
        },
      ],
    });

    if (!veiculo) {
      return res.status(404).json({
        status: "error",
        message: "Veículo não encontrado.",
      });
    }

    // Desassociar clientes (tabela N:M)
    await veiculo.setClientes([]); // limpa a tabela clientes_veiculos

    // Eliminar materiais e reparações
    if (veiculo.reparacoes && veiculo.reparacoes.length > 0) {
      for (const reparacao of veiculo.reparacoes) {
        if (reparacao.material_utilizado) {
          await reparacao.material_utilizado.destroy();
        }
        await reparacao.destroy();
      }
    }

    // Eliminar o veículo
    await veiculo.destroy();

    res.status(200).json({
      status: "success",
      message: "Veículo eliminado com sucesso.",
    });
  } catch (err) {
    console.error("Erro ao eliminar veículo:", err);
    res.status(500).json({
      status: "error",
      message: "Erro ao eliminar veículo.",
      error: err.message,
    });
  }
};

module.exports = endpointsFunction;
