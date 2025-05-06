const Reparacao = require("../models/reparacoes.model");
const Veiculo = require("../models/veiculos.model");
const MaterialUtilizado = require("../models/material_utilizado.model");

const endpointsFunction = {};

// Criar nova reparação
endpointsFunction.createReparacao = async (req, res) => {
  try {
    const {
      matricula,
      pintura_geral,
      pintura_de_para_choques_dianteiro,
      pintura_de_para_choques_traseiro,
      pintura_de_porta_esquerda_da_frente,
      pintura_de_porta_direita_da_frente,
      pintura_de_porta_esquerda_de_tras,
      pintura_de_porta_direita_de_tras,
      pintura_de_capas_de_espelho,
      pintura_de_capot,
      pintura_de_porta_bagagens,
      pintura_de_tejadilho,
      pintura_guarda_lamas_esquerdo_da_frente,
      pintura_guarda_lamas_direito_da_frente,
      pintura_guarda_lamas_esquerdo_de_tras,
      pintura_guarda_lamas_direito_de_tras,
      pintura_de_jantes,
      pintura_de_plasticos,
      pintura_de_embaladeiras,
      pintura_de_grossuras_de_portas,
      polimento_geral_profundo,
      polimento_geral,
      polimento_parcial,
      restauro_de_pecas_plasticas,
      restauro_de_pecas_metalicas,
      preco,
    } = req.body;

    const veiculo = await Veiculo.findByPk(matricula);
    if (!veiculo) {
      return res.status(404).json({
        status: "error",
        message: "Veículo com a matrícula indicada não foi encontrado.",
      });
    }

    await Reparacao.create({
      matricula,
      pintura_geral,
      pintura_de_para_choques_dianteiro,
      pintura_de_para_choques_traseiro,
      pintura_de_porta_esquerda_da_frente,
      pintura_de_porta_direita_da_frente,
      pintura_de_porta_esquerda_de_tras,
      pintura_de_porta_direita_de_tras,
      pintura_de_capas_de_espelho,
      pintura_de_capot,
      pintura_de_porta_bagagens,
      pintura_de_tejadilho,
      pintura_guarda_lamas_esquerdo_da_frente,
      pintura_guarda_lamas_direito_da_frente,
      pintura_guarda_lamas_esquerdo_de_tras,
      pintura_guarda_lamas_direito_de_tras,
      pintura_de_jantes,
      pintura_de_plasticos,
      pintura_de_embaladeiras,
      pintura_de_grossuras_de_portas,
      polimento_geral_profundo,
      polimento_geral,
      polimento_parcial,
      restauro_de_pecas_plasticas,
      restauro_de_pecas_metalicas,
      preco,
    });

    res.status(201).json({
      status: "success",
      message: "Reparação criada com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao criar reparação.",
      error: err.message,
    });
  }
};

// Obter todas as reparações por matrícula
endpointsFunction.getReparacoesByMatricula = async (req, res) => {
  try {
    const { matricula } = req.params;

    const veiculo = await Veiculo.findByPk(matricula, {
      include: [
        {
          model: Reparacao,
          include: [MaterialUtilizado],
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
      reparacoes: veiculo.Reparacaos,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao obter reparações do veículo.",
      error: err.message,
    });
  }
};

// Atualizar reparação por ID
endpointsFunction.updateReparacao = async (req, res) => {
  try {
    const { id_reparacao } = req.params;
    const dados = req.body;

    const reparacao = await Reparacao.findByPk(id_reparacao);
    if (!reparacao) {
      return res.status(404).json({
        status: "error",
        message: "Reparação não encontrada.",
      });
    }

    await reparacao.update(dados);

    res.status(200).json({
      status: "success",
      message: "Reparação atualizada com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar reparação.",
      error: err.message,
    });
  }
};

// Eliminar reparação por ID
endpointsFunction.deleteReparacao = async (req, res) => {
  try {
    const { id_reparacao } = req.params;

    const reparacao = await Reparacao.findByPk(id_reparacao);
    if (!reparacao) {
      return res.status(404).json({
        status: "error",
        message: "Reparação não encontrada.",
      });
    }

    await reparacao.destroy();

    res.status(200).json({
      status: "success",
      message: "Reparação eliminada com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Erro ao eliminar reparação.",
      error: err.message,
    });
  }
};

module.exports = endpointsFunction;
