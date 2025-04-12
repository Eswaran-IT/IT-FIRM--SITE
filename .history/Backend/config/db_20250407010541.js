const mysql = require("mysql2");
require("dotenv").config();

// Create the MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // e.g., 'localhost'
  user: process.env.DB_USER,      // e.g., 'root'
  password: process.env.DB_PASS,  // your password
  database: process.env.DB_NAME   // optional: include DB if needed
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1); // Exit the application if DB connection fails
  } else {
    console.log("✅ MySQL connected successfully");
  }
});

module.exports = connection;
