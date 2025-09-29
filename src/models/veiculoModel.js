import mongoose from "mongoose";

const veiculoSchema = new mongoose.Schema({
  placa: { type: String, required: true, unique: true, trim: true }, // ex: "ABC-1234"
  marca: { type: String, trim: true },
  modelo: { type: String, trim: true },
  cor: { type: String, trim: true },
  morador: { type: mongoose.Schema.Types.ObjectId, ref: "Morador", required: true }, // relacionamento
  vaga: { type: String, trim: true }, // opcional: número/identificação da vaga
  ativo: { type: Boolean, default: true }
}, {
  timestamps: true,
  collection: "veiculos"
});

export default mongoose.model("Veiculo", veiculoSchema);
