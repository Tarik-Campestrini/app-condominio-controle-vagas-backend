import connectDB from "../src/config/db.js";
import * as moradorController from "../src/controllers/moradorController.js";
import cors from "cors";

// Inicializa o middleware do CORS com as opções desejadas
const corsMiddleware = cors({
  origin: "https://app-condominio-controle-vagas-frontend-i93pb4xv5.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// Helper para executar o middleware em um ambiente serverless
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Executa o middleware do CORS antes de qualquer outra lógica
  await runMiddleware(req, res, corsMiddleware);

  await connectDB();

  const { method, query, body } = req;

  try {
    switch (method) {
      case "GET":
        const moradores = await moradorController.getMoradores();
        return res.status(200).json(moradores);

      case "POST":
        const novo = await moradorController.createMorador(body);
        return res.status(201).json(novo);

      case "PUT":
        const atualizado = await moradorController.updateMorador(query.id, body);
        return res.status(200).json(atualizado);

      case "DELETE":
        await moradorController.deleteMorador(query.id);
        return res.status(204).end();

      default:
        return res.status(405).json({ error: "Método não permitido" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
