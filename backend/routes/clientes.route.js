const express = require("express");
const router = express.Router();

// Importação middleware
const middleware = require("../middleware.js");

// Importação controller
const clientesController = require("../controllers/clientes.controller.js");

// Endpoints
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
  "/clientes/nif/:nif",
  middleware.checkToken,
  clientesController.getClienteByNif
);
router.get(
  "/clientes/nome/:nome",
  middleware.checkToken,
  clientesController.getClienteByNome
);

module.exports = router;
