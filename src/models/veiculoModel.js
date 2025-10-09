import mongoose from "mongoose";

const veiculoSchema = new mongoose.Schema({
  placa: { type: String, required: true, unique: true, trim: true }, 
  marca: { type: String, trim: true },
  modelo: { type: String, trim: true },
  cor: { type: String, trim: true },

  morador: { type: mongoose.Schema.Types.ObjectId, ref: "Morador", required: true },  // Referência ao veículo -> moradoroModel 

  ativo: { type: Boolean, default: true }
}, {
  timestamps: true, // mantém createdAt e updatedAt automáticos
  collection: "veiculos"
});

export default mongoose.model("Veiculo", veiculoSchema);
