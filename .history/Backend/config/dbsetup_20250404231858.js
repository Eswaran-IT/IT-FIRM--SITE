const connection = require("./db");
const { DB_NAME } = process.env;
const { CONTACT_TABLE, USER_TRACK_TABLE } = require("./constants");

connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
  if (err) throw err;

  connection.changeUser({ database: DB_NAME }, (err) => {
    if (err) throw err;

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
        section_viewed VARCHAR(100),
        time_spent INT,
        visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    connection.query(contactTableQuery);
    connection.query(userTrackQuery);

    console.log("Database and tables ready ✅");
  });
});
