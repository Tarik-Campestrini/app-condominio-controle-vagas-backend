import express from "express";
import cors from "cors";
import moradorRoutes from "../src/routes/moradorRoutes.js"; // ajuste caminho se necessário

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Rotas
app.use("/api/moradores", moradorRoutes);

export default app;
