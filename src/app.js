import express from "express";
import cors from "cors";
import moradorRoutes from "./routes/moradorRoutes.js";

const app = express();

// === CONFIGURAÇÃO DO CORS ===
const corsOptions = {
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // inclui OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // se precisar enviar cookies
};

app.use(cors(corsOptions));

// === Middleware para lidar com preflight (OPTIONS) ===
app.options("*", cors(corsOptions));

// === Parser JSON ===
app.use(express.json());

// === Rotas ===
app.use("/api/moradores", moradorRoutes);

export default app;
