const express = require("express");
const router = express.Router();

//importação middleware
const middleware = require("../middleware.js");

//importação controller
const material_utilizadoController = require("../controllers/material_utilizado.controller.js");

//rotas (endpoints) da entidade 'aluno'
router.post(
  "/material_utilizado",
  middleware.checkToken,
  material_utilizadoController.createMaterialUtilizado
);
router.get(
  "/material_utilizado",
  middleware.checkToken,
  material_utilizadoController.getAllMaterialUtilizado
);
router.put(
  "/material_utilizado/reparacao/:id_reparacao/veiculos/:matricula",
  middleware.checkToken,
  material_utilizadoController.updateMaterialUtilizado
);
router.delete(
  "/material_utilizado/reparacao/:id_reparacao/veiculos/:matricula",
  middleware.checkToken,
  material_utilizadoController.deleteMaterialUtilizado
);
router.get(
  "/material_utilizado/reparacao/:id_reparacao/veiculos/:matricula",
  middleware.checkToken,
  material_utilizadoController.getmaterial_utilizadoByMatricula
);
router.get(
  "/material_utilizado/reparacao/:id_reparacao/veiculos/:matricula",
  middleware.checkToken,
  material_utilizadoController.getmaterial_utilizadoById_reparacao
);

module.exports = router;
