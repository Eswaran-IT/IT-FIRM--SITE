const connection = require("../config/db");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.submitContactForm = (req, res) => {
  const { name, email, phone, message } = req.body;

  const query = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
  connection.query(query, [name, email, phone, message], async (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error", error: err });

    // Send email notification to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"GS Tech Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: "Form submitted & email sent" });
    } catch (mailErr) {
      return res.status(500).json({ success: false, message: "Email send failed", error: mailErr });
    }
  });
};
