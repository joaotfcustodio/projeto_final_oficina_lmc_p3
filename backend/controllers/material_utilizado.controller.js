const MaterialUtilizado = require("../models/material_utilizado.model");
const Reparacao = require("../models/reparacoes.model");
const Veiculo = require("../models/veiculos.model");

const endpointsFunction = {};

// Criar material utilizado
endpointsFunction.createMaterial = async (req, res) => {
  try {
    const {
      id_reparacao,
      marca_tinta,
      quantidade_tinta,
      marca_verniz,
      quantidade_verniz,
      massa_polimento,
      preco_gasoleo_estufa_lt,
      preco_gasoleo_estufa_total,
      quantidade_tinta_jantes,
      preco_verniz_carro,
      preco_tinta_carro,
      preco_tinta_jantes,
      preco_total_material_carro,
    } = req.body;

    const reparacao = await Reparacao.findByPk(id_reparacao);
    if (!reparacao) {
      return res.status(404).json({
        status: "error",
        message: "Reparação não encontrada.",
      });
    }

    const existente = await MaterialUtilizado.findOne({
      where: { id_reparacao },
    });
    if (existente) {
      return res.status(400).json({
        status: "error",
        message: "Já existe material associado a esta reparação.",
      });
    }

    await MaterialUtilizado.create({
      id_reparacao,
      matricula: reparacao.matricula,
      marca_tinta,
      quantidade_tinta,
      marca_verniz,
      quantidade_verniz,
      massa_polimento,
      preco_gasoleo_estufa_lt,
      preco_gasoleo_estufa_total,
      quantidade_tinta_jantes,
      preco_verniz_carro,
      preco_tinta_carro,
      preco_tinta_jantes,
      preco_total_material_carro,
    });

    res.status(201).json({
      status: "success",
      message: "Material utilizado criado com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar material utilizado.",
      error: err.message,
    });
  }
};

// Obter material utilizado de uma reparação através do id_reparacao
endpointsFunction.getMaterialByReparacao = async (req, res) => {
  try {
    const { id_reparacao } = req.params;

    const material = await MaterialUtilizado.findOne({
      where: { id_reparacao },
    });

    if (!material) {
      return res.status(404).json({
        status: "error",
        message: "Material utilizado não encontrado para esta reparação.",
      });
    }

    res.status(200).json({
      status: "success",
      material,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao obter material utilizado.",
      error: err.message,
    });
  }
};

// Atualizar material utilizado de uma reparação através do id_reparacao
endpointsFunction.updateMaterialByReparacao = async (req, res) => {
  try {
    const { id_reparacao } = req.params;
    const dadosAtualizados = req.body;

    const material = await MaterialUtilizado.findOne({
      where: { id_reparacao },
    });

    if (!material) {
      return res.status(404).json({
        status: "error",
        message: "Material utilizado não encontrado para esta reparação.",
      });
    }

    await material.update(dadosAtualizados);

    res.status(200).json({
      status: "success",
      message: "Material utilizado atualizado com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar material utilizado.",
      error: err.message,
    });
  }
};

// Eliminar material utilizado de uma reparação através do id_reparacao
endpointsFunction.deleteMaterialByReparacao = async (req, res) => {
  try {
    const { id_reparacao } = req.params;

    const material = await MaterialUtilizado.findOne({
      where: { id_reparacao },
    });

    if (!material) {
      return res.status(404).json({
        status: "error",
        message: "Material utilizado não encontrado para esta reparação.",
      });
    }

    await material.destroy();

    res.status(200).json({
      status: "success",
      message: "Material utilizado eliminado com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao eliminar material utilizado.",
      error: err.message,
    });
  }
};

module.exports = endpointsFunction;
