import express from "express";
import { getMoradores, createMorador, updateMorador, deleteMorador } from "../controllers/moradorController.js";

const router = express.Router();

router.get("/", getMoradores);
router.post("/", createMorador);
router.put("/:id", updateMorador);
router.delete("/:id", deleteMorador);

export default router;
