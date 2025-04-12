const connection = require("../config/db");
const { CONTACT_TABLE } = require("../config/constants");

const saveContactForm = (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const query = `INSERT INTO ${CONTACT_TABLE} (name, email, phone, message) VALUES (?, ?, ?, ?)`;

  connection.query(query, [name, email, phone, message], (err, results) => {
    if (err) {
      console.error("Error saving contact form:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({ success: true, message: "Form submitted successfully" });
  });
};

module.exports = { saveContactForm };
