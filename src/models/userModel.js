// src/models/userModel.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Por favor, informe o nome."],
    },
    email: {
      type: String,
      required: [true, "Por favor, informe o email."],
      unique: true, // Garante que cada email seja único
      lowercase: true, // Armazena emails em minúsculas para evitar duplicidade
      match: [ // Validação básica de formato de email
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, informe um email válido.",
      ],
    },
    senha: {
      type: String,
      required: [true, "Por favor, informe a senha."],
      minlength: 6, // Exemplo: exigir senha com no mínimo 6 caracteres
      select: false, // Impede que a senha seja retornada em buscas por padrão
    },
    //  'role' (admin, morador), 'ativo', etc.
     role: {
       type: String,
       enum: ['morador', 'admin'],
       default: 'morador'
     }
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt
  }
);

// Middleware (hook) para fazer HASH da senha ANTES de salvar
userSchema.pre("save", async function (next) {
  // Executa apenas se a senha foi modificada (ou é nova)
  if (!this.isModified("senha")) {
    return next();
  }

  try {
    // Gera um "salt" para adicionar aleatoriedade ao hash
    const salt = await bcrypt.genSalt(10);


    // Cria o hash da senha
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error); // Passa o erro para o Mongoose
  }
});

// Método para comparar a senha informada com a senha hashada no banco
userSchema.methods.matchPassword = async function (enteredPassword) {
  // 'this.senha' acessa a senha hashada do documento atual
  return await bcrypt.compare(enteredPassword, this.senha);
};

const User = mongoose.model("User", userSchema);

export default User;