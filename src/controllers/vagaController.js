import Vaga from "../models/vagaModel.js";

// ✅ Criar uma vaga manualmente
export const createVaga = async (req, res) => {
  try {
    const { identificador } = req.body;

    // Verifica se já existe uma vaga com o mesmo identificador
    const existingVaga = await Vaga.findOne({ identificador });
    if (existingVaga) {
      return res.status(400).json({ message: "Essa vaga já existe!" });
    }

    const vaga = new Vaga({ identificador });
    await vaga.save();

    res.status(201).json({
      message: "Vaga criada com sucesso!",
      vaga,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao criar vaga.",
      error: error.message,
    });
  }
};


// ✅ Listar todas as vagas
export const listarVagas = async (req, res) => {
  try {
    const vagas = await Vaga.find()
      .populate("morador")
      .populate("veiculo")
      .sort({ identificador: 1 });

    res.status(200).json(vagas);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao listar vagas.",
      error: error.message,
    });
  }
};

// ✅ Ocupar vaga
export const ocuparVaga = async (req, res) => {
  try {
    const { id } = req.params;
    const { morador, veiculo, visitante, dataSaida } = req.body;

    const vaga = await Vaga.findByIdAndUpdate(
      id,
      {
        status: "Ocupada",
        morador,
        veiculo,
        visitante,
        dataEntrada: new Date(),
        dataSaida,
      },
      { new: true }
    )
      .populate("morador")
      .populate("veiculo");

    res.status(200).json({
      message: "Vaga ocupada com sucesso!",
      vaga,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao ocupar vaga.",
      error: error.message,
    });
  }
};

// ✅ Liberar vaga
export const liberarVaga = async (req, res) => {
  try {
    const { id } = req.params;

    const vaga = await Vaga.findByIdAndUpdate(
      id,
      {
        status: "Livre",
        morador: null,
        veiculo: null,
        visitante: null,
        dataEntrada: null,
        dataSaida: null,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Vaga liberada com sucesso!",
      vaga,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao liberar vaga.",
      error: error.message,
    });
  }
};

// ✅ Deletar vaga
export const deletarVaga = async (req, res) => {
  try {
    const { id } = req.params;
    await Vaga.findByIdAndDelete(id);

    res.status(200).json({ message: "Vaga deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar vaga.",
      error: error.message,
    });
  }
};
