import express from "express";
import { getMoradores, createMorador, updateMorador, deleteMorador } from  "../controllers/moradorController.js";

const router = express.Router();

// Listar todos moradores
router.get("/", getMoradores);

// Criar morador
router.post("/", createMorador);

// Atualizar morador
router.put("/:id", updateMorador);

// Deletar morador
router.delete("/:id", deleteMorador);

export default router;
