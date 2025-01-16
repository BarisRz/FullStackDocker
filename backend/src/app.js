const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // keep this one, after checking the value in `backend/.env`
    ],
    credentials: true,
  })
);

// Middleware pour traiter JSON et cookies
app.use(express.json());
app.use(cookieParser());

// Routes API
app.use("/api", router);

// Export de l'application
module.exports = app;
