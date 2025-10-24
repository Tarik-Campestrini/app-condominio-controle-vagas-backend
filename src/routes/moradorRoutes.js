import express from "express";
import { getMoradores, createMorador, updateMorador, deleteMorador } from  "../controllers/moradorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Listar todos moradores
router.get("/", protect, getMoradores);

// Criar morador
router.post("/", protect, createMorador);

// Atualizar morador
router.put("/:id", protect, updateMorador);

// Deletar morador
router.delete("/:id", protect, deleteMorador);

export default router;
