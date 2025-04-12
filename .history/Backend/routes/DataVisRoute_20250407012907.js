const express = require("express");
const { getDetailedAnalytics } = require("../controllers/DataVisController");

const router = express.Router();

// ⛔️ Replace getUserAnalytics with ✅ getDetailedAnalytics
router.get("/analytics", getDetailedAnalytics);

module.exports = router;
