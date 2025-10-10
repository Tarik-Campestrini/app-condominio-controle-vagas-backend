import mongoose from "mongoose";

const vagaSchema = new mongoose.Schema(
  {
    identificador: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Livre", "Ocupada"], default: "Livre" },

    // Referência ao morador -> moradorModel
    morador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Morador",
      default: null,
    },

    // Referência ao veículo -> veiculoModel
    veiculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veiculo",
      default: null,
    },

    // Dados opcionais de visitante
    visitante: {
      nome: { type: String },
      documento: { type: String },
      telefone: { type: String }, // <-- CORREÇÃO AQUI
      veiculo: {
        placa: String,
        modelo: String,
        cor: String,
      },
    },

    // Campos de controle de ocupação
    dataEntrada: {
      type: Date,
    },
    dataSaida: {
      type: Date,
    },
  },
  {
    timestamps: true, // mantém createdAt e updatedAt automáticos
    collection: "vagas"
  }
);

export default mongoose.model("Vaga", vagaSchema);