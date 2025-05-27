const express = require("express");
const router = express.Router();

// Importação middleware
const middleware = require("../middleware.js");

// Importação controller
const reparacoesController = require("../controllers/reparacoes.controller.js");

// Endpoints

// Criar reparação
router.post(
  "/reparacoes",
  middleware.checkToken,
  reparacoesController.createReparacao
);

// Obter todas as reparações de um veículo
router.get(
  "/reparacoes/:matricula",
  middleware.checkToken,
  reparacoesController.getReparacoesByMatricula
);

// Atualizar reparação por ID
router.put(
  "/reparacoes/:id_reparacao",
  middleware.checkToken,
  reparacoesController.updateReparacao
);

// Eliminar reparação por ID
router.delete(
  "/reparacoes/:id_reparacao",
  middleware.checkToken,
  reparacoesController.deleteReparacao
);

module.exports = router;
