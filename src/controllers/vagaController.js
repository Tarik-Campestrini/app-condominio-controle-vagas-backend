import Vaga from "../models/vagaModel.js";

// 🔹 Buscar todas as vagas (com morador e veículo populados)
export const getVagas = async (req, res) => {
  try {
    const vagas = await Vaga.find()
      .populate("morador", "nome bloco apartamento telefone")
      .populate("veiculo", "placa modelo cor");
    res.json(vagas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar vagas", error });
  }
};

// 🔹 Criar uma nova vaga
export const createVaga = async (req, res) => {
  try {
    const { identificador, status, morador, veiculo } = req.body;

    const novaVaga = new Vaga({
      identificador,
      status,
      morador: morador || null,
      veiculo: veiculo || null,
    });

    await novaVaga.save();
    res.status(201).json(novaVaga);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar vaga", error });
  }
};

// 🔹 Atualizar vaga (ocupar ou liberar)
export const updateVaga = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, morador, veiculo } = req.body;

    const vagaAtualizada = await Vaga.findByIdAndUpdate(
      id,
      { status, morador: morador || null, veiculo: veiculo || null },
      { new: true }
    )
      .populate("morador", "nome bloco apartamento telefone")
      .populate("veiculo", "placa modelo cor");

    if (!vagaAtualizada) {
      return res.status(404).json({ message: "Vaga não encontrada" });
    }

    res.json(vagaAtualizada);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar vaga", error });
  }
};

// 🔹 Deletar vaga
export const deleteVaga = async (req, res) => {
  try {
    const { id } = req.params;

    const vagaDeletada = await Vaga.findByIdAndDelete(id);

    if (!vagaDeletada) {
      return res.status(404).json({ message: "Vaga não encontrada" });
    }

    res.json({ message: "Vaga removida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar vaga", error });
  }
};


// 68d18a7c900043125201275b morador
//  68da92fb09c4ed4d54d0714e veiculo