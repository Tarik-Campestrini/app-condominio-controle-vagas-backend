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

    // 1. Primeiro, buscamos a vaga pelo ID para verificar seu estado atual
    const vagaExistente = await Vaga.findById(id);

    // 2. Verificamos se a vaga realmente existe no banco de dados
    if (!vagaExistente) {
      return res.status(404).json({ error: "Vaga não encontrada." });
    }

    // 3. Verificamos se o status da vaga já é "Ocupada"
    if (vagaExistente.status === "Ocupada") {
      // Usamos o status 409 Conflict, que é apropriado para essa situação
      return res.status(409).json({ error: "Esta vaga já está ocupada." });
    }

    // 4. Se a vaga existe e está livre, aí sim atualizamos
    const vagaAtualizada = await Vaga.findByIdAndUpdate(
      id,
      {
        status: "Ocupada",
        morador,
        veiculo,
        visitante,
        dataEntrada: new Date(),
        dataSaida,
      },
      { new: true } // 'new: true' retorna o documento atualizado
    )
      .populate("morador")
      .populate("veiculo");

    // 5. Retornamos a resposta de sucesso
    res.status(200).json({
      message: "Vaga ocupada com sucesso!",
      vaga: vagaAtualizada,
    });
    
  } catch (error) {
    // O erro 11000 (duplicate key) ainda é útil caso você tenha uma regra de
    // unicidade no banco, como por exemplo, um veículo não poder ocupar duas vagas ao mesmo tempo.
    if (error.code === 11000) {
      return res.status(409).json({ 
        error: "Conflito de dados. O veículo ou morador já pode estar associado a outra vaga.",
        details: error.message 
      });
    }

    // Captura para outros erros inesperados
    console.error("Erro ao ocupar vaga:", error); // É uma boa prática logar o erro no servidor
    return res.status(500).json({ error: "Erro interno no servidor ao tentar ocupar a vaga.", details: error.message });
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
