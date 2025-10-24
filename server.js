import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import moradorRoutes from "./src/routes/moradorRoutes.js";
import veiculoRoutes from "./src/routes/veiculoRoutes.js";
import vagaRoutes from "./src/routes/vagaRoutes.js";
import authRoutes from "./src/routes/authRoutes.js"; //

dotenv.config();

const app = express();


app.use(cors());


app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas

// Autenticação Routes
app.use("/api/auth", authRoutes); 

// Morador Routes
app.use("/api/moradores", moradorRoutes);

// Veiculo Routes
app.use("/api/veiculos", veiculoRoutes);

// Vaga Routes
app.use("/api/vagas", vagaRoutes);

// Definir a porta
const PORT = process.env.PORT || 5000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log("Conectado na Port", PORT);
  
})

