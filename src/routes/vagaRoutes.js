import express from "express";
import { createVaga, listarVagas, ocuparVaga, liberarVaga } from "../controllers/vagaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar vaga
router.post("/", protect, createVaga);

// Deletar vaga
router.delete("/:id", protect, deletarVaga);

// Listar todas
router.get("/", protect, listarVagas);

// Ocupar uma vaga
router.put("/:id/ocupar", protect, ocuparVaga);

// Liberar uma vaga
router.put("/:id/liberar", protect, liberarVaga);

export default router;
