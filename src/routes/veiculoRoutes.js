import express from "express";
import {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
} from "../controllers/veiculoController.js";

const router = express.Router();

router.get("/", getVeiculos);
router.get("/:id", getVeiculoById);
router.post("/", createVeiculo);
router.put("/:id", updateVeiculo);
router.delete("/:id", deleteVeiculo);

export default router;
