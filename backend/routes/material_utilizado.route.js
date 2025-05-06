const express = require("express");
const router = express.Router();

// Importação middleware
const middleware = require("../middleware.js");

// Importação controller
const materialController = require("../controllers/material_utilizado.controller.js");

// Endpoints

// Criar material utilizado
router.post(
  "/materiais",
  middleware.checkToken,
  materialController.createMaterial
);

// Obter material utilizado por ID da reparação
router.get(
  "/materiais/:id_reparacao",
  middleware.checkToken,
  materialController.getMaterialByReparacao
);

// Atualizar material utilizado por ID da reparação
router.put(
  "/materiais/:id_reparacao",
  middleware.checkToken,
  materialController.updateMaterialByReparacao
);

// Eliminar material utilizado por ID da reparação
router.delete(
  "/materiais/:id_reparacao",
  middleware.checkToken,
  materialController.deleteMaterialByReparacao
);

module.exports = router;
