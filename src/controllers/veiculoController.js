import Veiculo from "../models/veiculoModel.js";
import mongoose from "mongoose";

// Listar todos (popula dados do morador)
export const getVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.find().populate("morador", "nome email apto apartamento");
    return res.status(200).json(veiculos);
  } catch (err) {
    console.error("Erro getVeiculos:", err);
    return res.status(500).json({ error: "Erro ao buscar veículos", details: err.message });
  }
};

// Buscar 1 por id
export const getVeiculoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "ID inválido" });

    const veiculo = await Veiculo.findById(id).populate("morador", "nome email apto apartamento");
    if (!veiculo) return res.status(404).json({ error: "Veículo não encontrado" });

    return res.status(200).json(veiculo);
  } catch (err) {
    console.error("Erro getVeiculoById:", err);
    return res.status(500).json({ error: "Erro ao buscar veículo", details: err.message });
  }
};

// Criar veículo
export const createVeiculo = async (req, res) => {
  try {
    const { placa, marca, modelo, cor, morador, vaga, ativo } = req.body;

    if (!placa || !morador) {
      return res.status(400).json({ error: "Campos obrigatórios: placa e morador" });
    }

    const veiculo = new Veiculo({ placa, marca, modelo, cor, morador, vaga, ativo });
    const saved = await veiculo.save();
    const populated = await saved.populate("morador", "nome email apto apartamento");
    return res.status(201).json(populated);
  } catch (err) {
    console.error("Erro createVeiculo:", err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.placa) {
      return res.status(409).json({ error: "Placa já cadastrada" });
    }
    return res.status(500).json({ error: "Erro ao criar veículo", details: err.message });
  }
};

// Atualizar veículo
export const updateVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "ID inválido" });

    const updated = await Veiculo.findByIdAndUpdate(id, updates, { new: true }).populate("morador", "nome email apto apartamento");
    if (!updated) return res.status(404).json({ error: "Veículo não encontrado" });

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Erro updateVeiculo:", err);
    if (err.code === 11000 && err.keyPattern && err.keyPattern.placa) {
      return res.status(409).json({ error: "Placa já cadastrada" });
    }
    return res.status(500).json({ error: "Erro ao atualizar veículo", details: err.message });
  }
};

// Deletar veículo
export const deleteVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "ID inválido" });

    const deleted = await Veiculo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Veículo não encontrado" });

    return res.status(200).json({ message: "Veículo excluído com sucesso" });
  } catch (err) {
    console.error("Erro deleteVeiculo:", err);
    return res.status(500).json({ error: "Erro ao excluir veículo", details: err.message });
  }
};
