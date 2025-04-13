require("dotenv").config();
const { connectDB, getConnection } = require("./db");

const DB_NAME = process.env.DB_NAME;
const CONTACT_TABLE = "contacts";
const USER_TRACK_TABLE = "user_tracking";

async function setupDatabase() {
  try {
    // 1. Connect to MySQL server
    await connectDB();
    const connection = getConnection();

    // ❗ Skip CREATE DATABASE for Clever Cloud (DB already exists)

    // 2. Switch to that database
    await connection.changeUser({ database: DB_NAME });

    // 3. Create contact table if not exists
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

    // 4. Create user tracking table if not exists
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
        entry_date DATE,
        entry_time TIME,
        exit_date DATE,
        exit_time TIME,
        time_spent INT,
        section_viewed JSON,
        interactions JSON
      )`;
    await connection.query(userTrackQuery);
    console.log("✅ User tracking table ready");

  } catch (err) {
    console.error("❌ Error in DB setup:", err.message);
    process.exit(1);
  }
}

module.exports = setupDatabase;
