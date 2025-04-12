const connection = require("./db");
const { DB_NAME } = process.env;

const CONTACT_TABLE = "contacts";
const USER_TRACK_TABLE = "user_tracking";

connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
  if (err) {
    console.error("❌ Error creating database:", err.message);
    return;
  }
  console.log(`✅ Database '${DB_NAME}' ensured`);

  connection.changeUser({ database: DB_NAME }, (err) => {
    if (err) {
      console.error("❌ Failed to switch to DB:", err.message);
      return;
    }

    const contactTableQuery = `
      CREATE TABLE IF NOT EXISTS ${CONTACT_TABLE} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
      const userTrackQuery = `
      CREATE TABLE IF NOT EXISTS ${USER_TRACK_TABLE} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(50),
        device_info TEXT,  -- Added device_info here
        browser_info VARCHAR(100),
        section_viewed JSON,
        interactions JSON,
        entry_time DATETIME,
        exit_time DATETIME,
        time_spent INT,
        is_new_user BOOLEAN,
        visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    
    

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
