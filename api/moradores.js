import connectDB from "../src/config/db.js";
import * as moradorController from "../src/controllers/moradorController.js";

export default async function handler(req, res) {
  await connectDB(); // garante conexão ativa a cada request

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
