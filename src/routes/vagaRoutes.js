import express from "express";
import { createVaga, getVagas, ocuparVaga, liberarVaga } from "../controllers/vagaController.js";

const router = express.Router();

// Criar vaga
router.post("/", createVaga);

// Listar todas
router.get("/", getVagas);

// Ocupar uma vaga
router.put("/:id/ocupar", ocuparVaga);

// Liberar uma vaga
router.put("/:id/liberar", liberarVaga);

export default router;
