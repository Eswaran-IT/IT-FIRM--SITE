const express = require("express");
const router = express.Router();
const { saveContactForm } = require("../controllers/ContactController");

router.post("/contact", saveContactForm);

module.exports = router;
