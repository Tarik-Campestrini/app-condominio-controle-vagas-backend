import User from "../models/userModel.js"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do .env

// Função de Login
export const login = async (req, res) => {
  const { email, senha } = req.body; // Pega email e senha do corpo da requisição

  // Validação básica de entrada
  if (!email || !senha) {
    return res.status(400).json({ message: "Por favor, forneça email e senha." });
  }

  try {
    //  Encontra o usuário pelo email
    //    .select('+senha') é crucial para incluir o campo senha na busca,
    //    já que definimos select: false no modelo.
    const user = await User.findOne({ email }).select("+senha");

    //  Verifica se o usuário existe E se a senha corresponde
    if (!user || !(await user.matchPassword(senha))) {
      // Usamos uma mensagem genérica por segurança (não dizer se foi o email ou a senha que errou)
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // 3. Usuário autenticado -> Gerar o Token JWT
    const payload = {
      userId: user._id,
      nome: user.nome, // Podemos incluir outras infos úteis no token (cuidado para não expor dados sensíveis)
      // role: user.role // Se você adicionar roles no futuro
    };

    // Pega o segredo JWT do arquivo da variavel de ambiente
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("ERRO CRÍTICO: Variável JWT_SECRET não definida no arquivo .env!");
        // Não exponha detalhes do erro para o cliente
        return res.status(500).json({ message: "Erro de configuração interna do servidor." });
    }

    // Define opções para o token 
    const options = {
      expiresIn: "1h", // Token expira em 1 hora 
    };

    // Gera o token
    const token = jwt.sign(payload, secret, options);

    //  Envia o token de volta para o frontend
    res.status(200).json({
      message: "Login bem-sucedido!",
      token: token, // O frontend precisará guardar este token    
       
    });

  } catch (error) {
    console.error("Erro no processo de login:", error);
    res.status(500).json({ message: "Erro interno no servidor durante o login." });
  }
};

// Função de Cadastro (Register) 
 export const register = async (req, res) => {
   const { nome, email, senha } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
       return res.status(400).json({ message: "Usuário já existe com este email." });
     }
     const user = await User.create({ nome, email, senha }); // A senha será hasheada automaticamente pelo middleware do modelo
   
     res.status(201).json({ message: "Usuário registrado com sucesso!", userId: user._id });
   } catch (error) {
     console.error("Erro no registro:", error);
     res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message });
   }
 };