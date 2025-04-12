const connection = require("./db");
const { DB_NAME } = process.env;

const CONTACT_TABLE = "contacts";
const USER_TRACK_TABLE = "user_tracking";

// Ensure database exists
connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
  if (err) {
    console.error("❌ Error creating database:", err.message);
    return;
  }
  console.log(`✅ Database '${DB_NAME}' ensured`);

  // Switch to the correct database
  connection.changeUser({ database: DB_NAME }, (err) => {
    if (err) {
      console.error("❌ Failed to switch to DB:", err.message);
      return;
    }

    // Ensure the contacts table exists
    const contactTableQuery = `
      CREATE TABLE IF NOT EXISTS ${CONTACT_TABLE} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    // Ensure the user_tracking table exists and contains the required columns
    CREATE TABLE user_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(255),
  device_info VARCHAR(255),
  browser_info VARCHAR(255),
  os_info VARCHAR(255),
  referrer VARCHAR(255),
  section_viewed TEXT,  -- This will store section details like the JSON array
  interactions TEXT,    -- This will store interaction details like the JSON array
  entry_date DATE,      -- Date when user entered
  entry_time TIME,      -- Time when user entered
  exit_date DATE,       -- Date when user exited
  exit_time TIME,       -- Time when user exited
  time_spent INT,       -- Time spent in seconds
  is_new_user BOOLEAN   -- Flag indicating if the user is new or returning
);


    // Execute the table creation queries
    connection.query(contactTableQuery, (err) => {
      if (err) console.error("❌ Error creating contacts table:", err.message);
      else console.log("✅ Contacts table ready");
    });

    connection.query(userTrackQuery, (err) => {
      if (err) console.error("❌ Error creating user_tracking table:", err.message);
      else console.log("✅ User tracking table ready");
    });
  });
});
