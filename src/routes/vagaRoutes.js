import express from "express";
import { getVagas, createVaga, updateVaga, deleteVaga } from "../controllers/vagaController.js";

const router = express.Router();

router.get("/", getVagas);
router.post("/", createVaga);
router.put("/:id", updateVaga);
router.delete("/:id", deleteVaga);

export default router;
