rrequire("dotenv").config();

const mysql = require("mysql2/promise");

// Dont forget to setup your own .env
const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function connectWithRetry() {
  try {
    await database.getConnection();
    console.log("Can reach database");
  } catch (err) {
    console.error(
      "Failed to connect to database, retrying in 5 seconds...",
      err
    );
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();
module.exports = database;
