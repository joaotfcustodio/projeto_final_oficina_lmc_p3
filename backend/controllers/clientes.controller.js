const Clientes = require("../models/clientes.model");
const Veiculos = require("../models/veiculos.model");
const Reparacoes = require("../models/reparacoes.model");
const MaterialUtilizado = require("../models/material_utilizado.model");

const endpointsFunction = {};

// Criar cliente
endpointsFunction.createCliente = async (req, res) => {
  let { nome, morada, nif, contacto, data_registo } = req.body;

  if (!nome || !morada || !nif || !contacto || !data_registo) {
    return res.status(400).json({
      status: "error",
      message: "Todos os campos são obrigatórios.",
    });
  }

  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!nomeRegex.test(nome)) {
    return res.status(400).json({
      status: "error",
      message: "O nome deve conter apenas letras.",
    });
  }

  const nifRegex = /^[1235689]\d{8}$/;
  if (!nifRegex.test(nif)) {
    return res.status(400).json({
      status: "error",
      message:
        "NIF inválido. Deve conter 9 dígitos e começar por 1, 2, 3, 5, 6, 8 ou 9.",
    });
  }

  const contactoRegex = /^\d{9}$/;
  if (!contactoRegex.test(contacto)) {
    return res.status(400).json({
      status: "error",
      message: "Contacto inválido. Deve conter exatamente 9 dígitos.",
    });
  }

  const data = new Date(data_registo);
  if (isNaN(data.getTime())) {
    return res.status(400).json({
      status: "error",
      message: "Data de registo inválida.",
    });
  }

  const existente = await Clientes.findOne({ where: { nif } });
  if (existente) {
    return res.status(409).json({
      status: "error",
      message: "Já existe um cliente com esse NIF.",
    });
  }

  try {
    const cliente = await Clientes.create({
      nome,
      morada,
      nif,
      contacto,
      data_registo: data,
    });

    return res.status(201).json({
      status: "success",
      message: "Cliente criado com sucesso.",
      data: cliente,
    });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return res.status(500).json({
      status: "error",
      message: "Erro interno ao criar cliente.",
      details: error.message,
    });
  }
};

// Listar todos os clientes
endpointsFunction.getAllClientes = async (req, res) => {
  try {
    const clientes = await Clientes.findAll();
    res.status(200).json({
      status: "success",
      data: clientes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao listar clientes.",
    });
  }
};

// Atualizar cliente por NIF
endpointsFunction.updateCliente = async (req, res) => {
  const { nif } = req.params;
  const { nome, morada, contacto, data_registo } = req.body;
  try {
    const atualizado = await Clientes.update(
      { nome, morada, contacto, data_registo },
      { where: { nif } }
    );
    if (atualizado[0] === 0) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Cliente atualizado com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao atualizar cliente.",
      details: error.message,
    });
  }
};

// Eliminar cliente por NIF
endpointsFunction.deleteCliente = async (req, res) => {
  const { nif } = req.params;
  try {
    const eliminado = await Clientes.destroy({ where: { nif } });
    if (!eliminado) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao eliminar cliente.",
    });
  }
};

// 🔍 Buscar cliente por NIF com veículos
endpointsFunction.getClientePorNifComVeiculos = async (req, res) => {
  const { nif } = req.params;
  try {
    const cliente = await Clientes.findOne({
      where: { nif },
      include: [
        {
          model: Veiculos,
          as: "veiculos",
          through: { attributes: [] },
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      data: cliente,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar cliente.",
      details: error.message,
    });
  }
};

// Procurar cliente por nome
endpointsFunction.getClienteByNome = async (req, res) => {
  const { nome } = req.params;
  try {
    const cliente = await Clientes.findOne({ where: { nome } });
    if (!cliente) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }
    res.status(200).json({ status: "success", data: cliente });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao procurar cliente.",
    });
  }
};

// Ficha técnica completa
endpointsFunction.getFichaTecnicaByCliente = async (req, res) => {
  const { nif } = req.params;
  try {
    const cliente = await Clientes.findOne({
      where: { nif },
      include: [
        {
          model: Veiculos,
          as: "veiculos",
          through: { attributes: [] },
          include: [
            {
              model: Reparacoes,
              as: "reparacoes",
              include: [
                {
                  model: MaterialUtilizado,
                  as: "material_utilizado",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }

    res.status(200).json({ status: "success", data: cliente });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao obter ficha técnica.",
      details: error.message,
    });
  }
};

module.exports = endpointsFunction;
