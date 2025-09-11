import mongoose from "mongoose";

const moradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  apto: { type: Number, required: true },
  telefone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Morador", moradorSchema);
