// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS;
    });
    console.log("MySQL connected successfully");
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
}

function getConnection() {
  return connection;
}

module.exports = { connectDB, getConnection };
