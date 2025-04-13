const mysql = require("mysql2/promise");
require("dotenv").config();

let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT || 3306 // 👈 Added port
    });
    console.log("✅ MySQL Database Connected");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
}

function getConnection() {
  return connection;
}

module.exports = { connectDB, getConnection };
