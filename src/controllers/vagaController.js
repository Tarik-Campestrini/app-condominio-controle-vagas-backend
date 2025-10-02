import Vaga from "../models/vagaModel.js";


// Criar uma vaga
export const createVaga = async (req, res) => {
  try {
    const { identificador } = req.body;

    const novaVaga = new Vaga({
      identificador,
      status: "Livre",
      morador: null,
      veiculo: null,
      visitante: null
    });

    await novaVaga.save();
    res.status(201).json(novaVaga);

  } catch (error) {
    // Se for erro de duplicidade
    if (error.code === 11000) {
      return res.status(400).json({ message: `A vaga ${req.body.identificador} já existe!` });
    }

    res.status(500).json({ message: "Erro ao criar vaga", error });
  }
};



// Listar todas as vagas 
export const getVagas = async (req, res) => {
  try {
    const vagas = await Vaga.find()
      .populate("morador")
      .populate("veiculo");
    res.json(vagas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar vagas", error });
  }
};

// Ocupar vaga
export const ocuparVaga = async (req, res) => {
  try {
    const { id } = req.params;
    const { morador, veiculo, visitante } = req.body;

    const vaga = await Vaga.findByIdAndUpdate(
      id,
      {
        status: "Ocupada",
        morador: morador || null,
        veiculo: veiculo || null,
        visitante: visitante || null,
      },
      { new: true }
    ).populate("morador").populate("veiculo");

    res.json(vaga);
  } catch (error) {
    res.status(500).json({ message: "Erro ao ocupar vaga", error });
  }
};

// Liberar vaga
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
      },
      { new: true }
    );

    res.json(vaga);
  } catch (error) {
    res.status(500).json({ message: "Erro ao liberar vaga", error });
  }
};