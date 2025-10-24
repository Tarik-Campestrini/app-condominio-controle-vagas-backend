
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 

// Carregar variáveis de ambiente
dotenv.config(); 

// Função para conectar ao banco de dados 
const connectDB = async () => {

  // try/catch para tratar erros
  try {

    // Faz a conexão caso tudo esteja ok
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Exibe a menssgem se conectado no BD
    console.log("MongoDB conectado com sucesso!");

  } catch (error) {

    // Exibe a menssagem de erro caso falhe a conexão  BD
    console.error("Erro ao conectar ao MongoDB:", error); 

    // Encerra o servidor em caso de falha na conexão
    process.exit(1); 
  }
};


export default connectDB; 
