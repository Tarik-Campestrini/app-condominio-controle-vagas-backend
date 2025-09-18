import connectDB from "../src/config/db.js";
import Morador from "../src/models/Morador.js";

connectDB(); // Conecta ao MongoDB

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const moradores = await Morador.find();
      res.status(200).json(moradores);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar moradores" });
    }
  } else if (req.method === "POST") {
    try {
      const novoMorador = await Morador.create(req.body);
      res.status(201).json(novoMorador);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar morador" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
