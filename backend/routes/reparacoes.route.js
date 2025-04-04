const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware.js");

//importação controller
const reparacoesController = require("../controllers/reparacoes.controller.js");

//rotas (endpoints) da entidade 'aluno'
router.post(
  "/reparacoes",
  middleware.checkToken,
  reparacoesController.createReparacoes
);
router.get(
  "/reparacoes/veiculos/:matricula",
  middleware.checkToken,
  reparacoesController.getAllReparacoes
);
router.put(
  "/reparacoes/veiculos/:matricula",
  middleware.checkToken,
  reparacoesController.updateReparacoes
);
router.delete(
  "/reparacoes/veiculos/:matricula",
  middleware.checkToken,
  reparacoesController.deleteReparacoes
);

module.exports = router;
