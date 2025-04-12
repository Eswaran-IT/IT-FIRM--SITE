const express = require("express");
const { getUserAnalytics } = require("../controllers/DataVisController");

const router = express.Router();
router.get("/analytics", getUserAnalytics);

module.exports = router;
