require("dotenv").config();

const mysql = require("mysql2/promise");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
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
      err,
    );
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();
module.exports = database;
