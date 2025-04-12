// config/db.js
const mysql = require("mysql2"); // IMPORTANT: NOT 'mysql2/promise'
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true, // optional, but helpful for setup
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

module.exports = connection; // <-- IMPORTANT: Don't export promise()
