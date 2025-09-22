// Faz a importação 
import User from "../models/moradorModel.js";

// Função para criar um novo morador
export const createMorador = async (req, res) => {
  try {
    const { nome, email, bloco, apartamento, telefone } = req.body;

    if (!nome || !email || !bloco || !apartamento || !telefone) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const newMorador = new User({ nome, email, bloco, apartamento, telefone });
    await newMorador.save();

    res.status(201).json({ message: "Morador criado com sucesso", morador: newMorador });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar morador" });
  }
};


// Função Buscar todos os moradores do Banco de Dados
export const getMoradores = async (req, res) => {
  try {
    // Busca apenas os campos necessários
    const users = await User.find({}, "nome email bloco apartamento telefone");
    res.json(users);
  } catch (error) {

    // Retorna um erro 500 caso falha
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

// Função para atualizar um usuário pelo ID
import mongoose from "mongoose";

export const updateMorador = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido antes de tentar atualizar
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};



// Função para deletar um usuário
export const deleteMorador = async (req, res) => {
  try {
      const { id } = req.params;

      // Verifica se o ID fornecido é válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "ID inválido" });
      }

      const user = await User.findByIdAndDelete(id);

      if (!user) {
          return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir usuário" });
  }
};
