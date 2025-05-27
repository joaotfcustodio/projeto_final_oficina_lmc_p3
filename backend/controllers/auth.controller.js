const sequelize = require("../config/database");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const endpointsFunction = {};

// REGISTO
endpointsFunction.register = async (req, res) => {
  const { nome, email, password } = req.body;

  // Validações iniciais
  if (!nome || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Nome, email e password são obrigatórios.",
    });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Formato de email inválido.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "A password deve ter pelo menos 6 caracteres.",
    });
  }

  try {
    // Verificar se já existe um utilizador com este email
    const existente = await User.findOne({ where: { email } });

    if (existente) {
      return res.status(409).json({
        success: false,
        message: "Este email já está registado.",
      });
    }

    // Criar novo utilizador
    const novoUser = await User.create({
      nome,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Utilizador registado com sucesso.",
      data: {
        id: novoUser.id,
        nome: novoUser.nome,
        email: novoUser.email,
      },
    });
  } catch (error) {
    console.error("Erro no registo:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno ao criar utilizador.",
    });
  }
};

// LOGIN
endpointsFunction.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email e password são obrigatórios.",
    });
  }

  try {
    console.log("EMAIL recebido:", email);
    const user = await User.findOne({ where: { email } });
    console.log("UTILIZADOR encontrado:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou password incorretos.",
      });
    }

    console.log("Password recebida:", password);
    console.log("Hash armazenado:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Resultado do bcrypt.compare:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email ou password incorretos.",
      });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
      expiresIn: config.timer,
    });

    res.status(200).json({
      success: true,
      message: "Login efetuado com sucesso.",
      AccessToken: token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao tentar autenticar.",
    });
  }
};

// REFRESH TOKEN
endpointsFunction.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token não fornecido.",
    });
  }

  try {
    const decoded = jwt.verify(token, config.secret);

    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      config.secret,
      { expiresIn: config.timer }
    );

    res.status(200).json({
      success: true,
      message: "Token renovado com sucesso.",
      AccessToken: newToken,
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
};

// LOGOUT
endpointsFunction.logout = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logout realizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro no logout:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao terminar sessão.",
    });
  }
};

module.exports = endpointsFunction;
