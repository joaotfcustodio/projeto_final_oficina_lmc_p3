const express = require("express");
const router = express.Router();

// Importação middleware
const middleware = require("../middleware.js");

// Importação controller
const veiculosController = require("../controllers/veiculos.controller.js");

// Endpoints
router.post(
  "/veiculos",
  middleware.checkToken,
  veiculosController.createVeiculo
);

router.get(
  "/veiculos/:matricula",
  middleware.checkToken,
  veiculosController.getVeiculoByMatricula
);

router.put(
  "/veiculos/:matricula",
  middleware.checkToken,
  veiculosController.updateVeiculo
);

router.delete(
  "/veiculos/:matricula",
  middleware.checkToken,
  veiculosController.deleteVeiculo
);

module.exports = router;
