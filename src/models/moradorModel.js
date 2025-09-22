import mongoose from "mongoose";

const moradorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  bloco: { type: String, required: true },
  apartamento: { type: String, required: true },
  telefone: { type: String, required: true }
}, { timestamps: true });

const Morador = mongoose.model("Morador", moradorSchema);

export default Morador;
