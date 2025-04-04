const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware.js");

//importação controller
const veiculosController = require("../controllers/veiculos.controller.js");

//rotas (endpoints) da entidade 'aluno'
router.post(
  "/veiculos",
  middleware.checkToken,
  veiculosController.createVeiculos
);
router.get(
  "/veiculos",
  middleware.checkToken,
  veiculosController.getAllVeiculos
);
router.put(
  "/veiculos/:matricula",
  middleware.checkToken,
  veiculosController.updateVeiculos
);
router.delete(
  "/veiculos/:matricula",
  middleware.checkToken,
  veiculosController.deleteVeiculos
);
router.get(
  "/veiculos/:matricula",
  middleware.checkToken,
  veiculosController.getVeiculosByMatricula
);
router.get(
  "/veiculos/:marca",
  middleware.checkToken,
  veiculosController.getVeiculosByMarca
);

module.exports = router;
