import Morador from "../models/moradorModel.js";

// Buscar todos
export const getMoradores = async () => {
  return await Morador.find();
};

// Criar
export const createMorador = async (data) => {
  const morador = new Morador(data);
  return await morador.save();
};

// Atualizar
export const updateMorador = async (id, data) => {
  return await Morador.findByIdAndUpdate(id, data, { new: true });
};

// Deletar
export const deleteMorador = async (id) => {
  return await Morador.findByIdAndDelete(id);
};
