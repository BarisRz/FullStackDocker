const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // URL du frontend
    credentials: true, // Autoriser les cookies et les headers avec credentials
  })
);

// Middleware personnalisé pour valider l'origine
app.use((req, res, next) => {
  const allowedOrigins = [process.env.FRONTEND_URL];
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.includes(origin)) {
    console.error(`Requête bloquée : origine non autorisée (${origin})`);
    return res.status(403).send("Forbidden");
  }
  next();
});

// Middleware pour traiter JSON et cookies
app.use(express.json());
app.use(cookieParser());

// Routes API
app.use("/api", router);

// Export de l'application
module.exports = app;
