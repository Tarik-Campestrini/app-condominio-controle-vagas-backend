import Morador from "../models/moradorModel.js";

// GET - listar
export const getMoradores = async (req, res) => {
  try {
    const moradores = await Morador.find();
    res.json(moradores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar moradores" });
  }
};

// POST - criar
export const createMorador = async (req, res) => {
  try {
    const novoMorador = new Morador(req.body);
    await novoMorador.save();
    res.status(201).json(novoMorador);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar morador" });
  }
};

// PUT - atualizar
export const updateMorador = async (req, res) => {
  try {
    const { id } = req.params;
    const atualizado = await Morador.findByIdAndUpdate(id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: "Morador não encontrado" });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar morador" });
  }
};

// DELETE - remover
export const deleteMorador = async (req, res) => {
  try {
    const { id } = req.params;
    const removido = await Morador.findByIdAndDelete(id);
    if (!removido) return res.status(404).json({ error: "Morador não encontrado" });
    res.json({ message: "Morador removido com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao remover morador" });
  }
};
