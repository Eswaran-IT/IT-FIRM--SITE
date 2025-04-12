const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/ContactController");

router.post("/contact", submitContactForm);

module.exports = router;
