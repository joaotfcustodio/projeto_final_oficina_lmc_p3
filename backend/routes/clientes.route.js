const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware.js");

//importação controller
const clientesController = require("../controllers/clientes.controller.js");

//rotas (endpoints) da entidade 'aluno'
router.post(
  "/clientes",
  middleware.checkToken,
  clientesController.createClientes
);
router.get(
  "/clientes",
  middleware.checkToken,
  clientesController.getAllClientes
);
router.put(
  "/clientes/:nif",
  middleware.checkToken,
  clientesController.updateClientes
);
router.delete(
  "/clientes/:nif",
  middleware.checkToken,
  clientesController.deleteClientes
);
router.get(
  "/clientes/:nif",
  middleware.checkToken,
  clientesController.getClientesByNif
);
router.get(
  "/clientes/:nome",
  middleware.checkToken,
  clientesController.getClientesByNome
);

module.exports = router;
