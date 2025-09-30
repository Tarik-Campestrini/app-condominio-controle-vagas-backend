import mongoose from "mongoose";

const vagaSchema = new mongoose.Schema({
  identificador: { type: String, required: true, unique: true }, // ex: "A-01", "B-02"
  status: { type: String, enum: ["livre", "ocupada"], default: "livre" },
  morador: { type: mongoose.Schema.Types.ObjectId, ref: "Morador", default: null },
  veiculo: { type: mongoose.Schema.Types.ObjectId, ref: "Veiculo", default: null },
  visitante: {
    nome: { type: String, trim: true },
    placa: { type: String, trim: true },
    modelo: { type: String, trim: true },
    cor: { type: String, trim: true },
    telefone: { type: String, trim: true }
  }
}, { timestamps: true });

const Vaga = mongoose.model("Vaga", vagaSchema);

export default Vaga;
