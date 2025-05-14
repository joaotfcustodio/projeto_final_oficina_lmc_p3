const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Utilizador = require("../models/utilizador.model");
const config = require("../config/config");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilizador = await Utilizador.findOne({ where: { email } });

    if (!utilizador) {
      return res.status(401).json({ message: "Email inválido." });
    }

    const passwordValida = await bcrypt.compare(password, utilizador.password);

    if (!passwordValida) {
      return res.status(401).json({ message: "Password inválida." });
    }

    // Gerar token JWT com validade de 30 minutos diretamente
    const token = jwt.sign({ id: utilizador.id, email }, config.secret, {
      expiresIn: "30m",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erro interno.", error: err.message });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await Utilizador.create({ email, password: hash });

    res.status(201).json({ message: "Utilizador registado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao registar utilizador.", error: err.message });
  }
};

module.exports = { login, register };
