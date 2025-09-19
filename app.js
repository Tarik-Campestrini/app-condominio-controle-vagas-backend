import express from "express";
import cors from "cors";
import moradorRoutes from "./src/routes/moradorRoutes.js";

const app = express();

// === CONFIGURAÇÃO DO CORS ===
const corsOptions = {
  origin: "https://app-condominio-controle-vagas-frontend-i93pb4xv5.vercel.app", // frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // inclui OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // se precisar enviar cookies
};

app.use(cors(corsOptions));

// === Parser JSON ===
app.use(express.json());

// === Rotas ===
app.use("/api/moradores", moradorRoutes);

export default app;
