// src/routes/veiculoRoutes.js
import express from "express";
import {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
} from "../controllers/veiculoController.js";

// Criar o roteador
const router = express.Router();

// Listar todos os veículos
router.get("/", getVeiculos);

// Buscar veículo por ID
router.get("/:id", getVeiculoById);

// Criar um veículo
router.post("/", createVeiculo);

// Atualizar  veículos
router.put("/:id", updateVeiculo);

// Deletar veículo
router.delete("/:id", deleteVeiculo);

export default router;
