require("dotenv").config();

// Importing Express app from src/app.js
const app = require("./src/app");

// Getting port from .env file, not the DB PORT!
const port = process.env.APP_PORT;

// Starting the server and listening on the port
app
  .listen(port, () => {
    console.log(`Server is listening on ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
