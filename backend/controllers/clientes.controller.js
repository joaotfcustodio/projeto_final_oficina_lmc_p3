const Clientes = require("../models/clientes.model");
const Veiculos = require("../models/veiculos.model");

const endpointsFunction = {};

// método para criar um estudante
endpointsFunction.createCliente = async (req, res) => {
  const { nome, morada, nif, contacto, data_registo } = req.body;
  try {
    const dados = await Clientes.create({
      nome: nome,
      morada: morada,
      nif: nif,
      contacto: contacto,
      data_registo: data_registo,
    });

    res.status(201).json({
      status: "success",
      message: "Cliente criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Ocorreu um erro ao criar o cliente.",
      data: null,
    });
  }
};

//método que retorna todos os estudantes
endpointsFunction.getAllClientes = async (req, res) => {
  try {
    const dados = await Clientes.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de clientes da oficina LMC.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        "Ocorreu um erro ao retornar a lista de clientes da Oficina LMC.",
      data: null,
    });
  }
};

//método que atualiza dos dados do estudante de acordo com o seu NIF
endpointsFunction.updateCliente = async (req, res) => {
  const { nif } = req.params;
  const { nome, morada, contacto, data_registo } = req.body;

  try {
    const dados = await Clientes.update(
      {
        nome: nome,
        morada: morada,
        contacto: contacto,
        data_registo: data_registo,
      },
      {
        where: { nif: nif },
      }
    );
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Cliente atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar o cliente.",
      data: null,
    });
  }
};

//método que apaga os dados de um estudante de acordo com o seu NIF
endpointsFunction.deleteCliente = async (req, res) => {
  const { nif } = req.params;
  try {
    const dados = await Clientes.destroy({
      where: { nif: nif },
    });

    res.status(204).json({
      status: "success",
      message: "Cliente apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao apagar o cliente.",
      data: null,
    });
  }
};

//método que retorna os dados de um estudante de acordo com o seu NIF
endpointsFunction.geClienteByNif = async (req, res) => {
  const { nif } = req.params;
  try {
    const dados = await Clientes.findOne({
      where: { nif: nif },
    });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Cliente encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar o cliente.",
      data: null,
    });
  }
};

//método que retorna os dados de um estudante de acordo com o seu nome
endpointsFunction.getClienteByNome = async (req, res) => {
  const { nome } = req.params;
  try {
    const dados = await Clientes.findOne({
      where: { nome: nome },
    });
    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Cliente encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar o cliente.",
      data: null,
    });
  }
};

// método que retorna todos os veículos de um cliente de acordo com o seu NIF
endpointsFunction.getVeiculosEnrolledByCliente = async (req, res) => {
  const { nif } = req.params;
  try {
    const dados = await Clientes.findOne({
      where: { nif: nif },
      include: ["veiculos"],
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Veículos encontrados com sucesso.",
      data: dados.veiculos,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar os veículos.",
      data: null,
    });
  }
};

// método que adiciona um veículo a um cliente de acordo com os seus NIF
endpointsFunction.addVeiculosToCliente = async (req, res) => {
  const { nif } = req.params;
  const { matricula } = req.body;

  try {
    // Verifica se o cliente existe
    const student = await Clientes.findByPk(nif);
    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Cliente não encontrado.",
      });
    }

    // Verifica se a matricula existe
    const subject = await Veiculos.findByPk(matricula);
    if (!Veiculos) {
      return res.status(404).json({
        status: "error",
        message: "Veículo não encontrado.",
      });
    }

    // Adiciona o veículo ao cliente
    await Clientes.addVeiculosToCliente(Veiculos);

    res.status(200).json({
      status: "success",
      message: "Veículo adicionado ao cliente com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao adicionar o veículo ao cliente.",
      details: error.message,
    });
  }
};

module.exports = endpointsFunction;
