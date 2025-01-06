const express = require("express");
const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // URL of the frontend, add more if needed
    ],
    credentials: true, // Allow cookies/headers to be sent from the frontend
  })
);

app.use(express.json()); // Parse JSON bodies

/* ************************************************************************* */

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Parse cookies

/* ************************************************************************* */

const router = require("./router");
app.use("/api", router); // All API routes are prefixed with /api

/* ************************************************************************* */

// Error handling middleware
// Not done yet, but will be added later

module.exports = app;
