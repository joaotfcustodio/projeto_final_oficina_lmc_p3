const express = require("express");
const router = express.Router();

// Middleware
const middleware = require("../middleware.js");

// Controller
const clientesController = require("../controllers/clientes.controller.js");

// Rotas protegidas com middleware de autenticação
router.post(
  "/clientes",
  middleware.checkToken,
  clientesController.createCliente
);

router.get(
  "/clientes",
  middleware.checkToken,
  clientesController.getAllClientes
);

router.put(
  "/clientes/:nif",
  middleware.checkToken,
  clientesController.updateCliente
);

router.delete(
  "/clientes/:nif",
  middleware.checkToken,
  clientesController.deleteCliente
);

router.get(
  "/clientes/:nif",
  middleware.checkToken,
  clientesController.getClientePorNifComVeiculos
);

// Pesquisa por nome
router.get(
  "/clientes/nome/:nome",
  middleware.checkToken,
  clientesController.getClienteByNome
);

module.exports = router;
