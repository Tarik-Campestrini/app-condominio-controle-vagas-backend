// src/routes/authRoutes.js

import express from "express";
import { login , register } from "../controllers/authController.js"; // Importa a(s) função(ões) do controller

const router = express.Router();

// Define a rota POST para /login
router.post("/login", login);

// Define a rota POST para /register
router.post("/register", register);

export default router;