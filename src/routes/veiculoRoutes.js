import express from "express";
import {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
} from "../controllers/veiculoController.js";

import { protect } from "../middleware/authMiddleware.js";

// Criar o roteador
const router = express.Router();

// Listar todos os veículos
router.get("/", protect, getVeiculos);

// Buscar veículo por ID
router.get("/:id", protect, getVeiculoById);

// Criar um veículo
router.post("/", protect, createVeiculo);

// Atualizar  veículos
router.put("/:id", protect, updateVeiculo);

// Deletar veículo
router.delete("/:id", protect, deleteVeiculo);

export default router;
