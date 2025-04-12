const connection = require("../config/db");
const sendMail = require("../utils/sendMail");
const { CONTACT_TABLE } = require("../utils/constants");

const handleContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // ✅ Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const query = `INSERT INTO ${CONTACT_TABLE} (name, email, phone, message) VALUES (?, ?, ?, ?)`;

  connection.query(query, [name, email, phone, message], async (err, results) => {
    if (err) {
      console.error("❌ MySQL Insert Error:", err.sqlMessage || err.message);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    // ✅ Log insert result (optional)
    console.log("✅ Contact saved:", results);

    try {
      const mailSent = await sendMail({ name, email, phone, message });

      if (!mailSent) {
        console.error("❌ Email sending failed");
        return res.status(500).json({ success: false, error: "Failed to send email" });
      }

      console.log("✅ Email sent successfully");
      return res.status(200).json({ success: true, message: "Submitted successfully" });
    } catch (emailErr) {
      console.error("❌ Email sending error:", emailErr.message);
      return res.status(500).json({ success: false, error: "Email service error" });
    }
  });
};

module.exports = { handleContactForm };
