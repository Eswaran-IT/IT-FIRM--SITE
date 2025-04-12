// config/dbsetup.js
require("dotenv").config();
const { connectDB, getConnection } = require("./db");

const { DB_NAME } = process.env;
const CONTACT_TABLE = "contacts";
const USER_TRACK_TABLE = "user_tracking";

(async () => {
  try {
    // 1. Connect to DB
    await connectDB();
    const connection = getConnection();

    // 2. Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`✅ Database '${DB_NAME}' ensured`);

    // 3. Switch to that database
    await connection.changeUser({ database: DB_NAME });

    // 4. Create contact table
    const contactTableQuery = `
      CREATE TABLE IF NOT EXISTS ${CONTACT_TABLE} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    await connection.query(contactTableQuery);
    console.log("✅ Contacts table ready");

    // 5. Create user tracking table
    const userTrackQuery = `
      CREATE TABLE IF NOT EXISTS ${USER_TRACK_TABLE} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(100),
        ip_address VARCHAR(45),
        country VARCHAR(100),
        browser_info VARCHAR(100),
        device_info VARCHAR(50),
        os_info VARCHAR(50),
        referrer TEXT,
        is_new_user BOOLEAN,
        date DATE,
        entry_time DATETIME,
        exit_time DATETIME,
        time_spent INT,
        section_viewed JSON,
        interactions JSON
      )`;
    await connection.query(userTrackQuery);
    console.log("User tracking table ready");

  } catch (err) {
    console.error("❌ Error in DB setup:", err.message);
    process.exit(1);
  }
})();
