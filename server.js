import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import moradorRoutes from "./src/routes/moradorRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/moradores", moradorRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Conectado na Port", PORT);
  
});
