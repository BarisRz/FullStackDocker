const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === process.env.FRONTEND_URL) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Autoriser les cookies et les headers avec credentials
  })
);

// Middleware pour traiter JSON et cookies
app.use(express.json());
app.use(cookieParser());

// Routes API
app.use("/api", router);

// Export de l'application
module.exports = app;
