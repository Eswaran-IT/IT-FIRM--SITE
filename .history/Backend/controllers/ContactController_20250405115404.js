const connection = require("../config/db");
const sendMail = require("../utils/sendMail");
const { CONTACT_TABLE } = require("../config/Constants");

const handleContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const query = `INSERT INTO ${CONTACT_TABLE} (name, email, phone, message) VALUES (?, ?, ?, ?)`;
  connection.query(query, [name, email, phone, message], async (err) => {
    if (err) return res.status(500).json({ success: false, error: "Database error" });

    const mailSent = await sendMail({ name, email, phone, message });
    if (!mailSent) {
      return res.status(500).json({ success: false, error: "Failed to send email" });
    }

    return res.status(200).json({ success: true, message: "Submitted successfully" });
  });
};

module.exports = { handleContactForm };
