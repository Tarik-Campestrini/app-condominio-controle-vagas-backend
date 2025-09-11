import express from "express";
import moradorRoutes from "./routes/moradorRoutes.js";

const app = express();

app.use(express.json());

// Aqui é o ponto principal:
app.use("/api/moradores", moradorRoutes);

export default app;

