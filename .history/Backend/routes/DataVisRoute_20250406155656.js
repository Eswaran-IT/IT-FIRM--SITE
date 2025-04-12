const express = require("express");
const router = express.Router();

const { getUserAnalytics } = require("../controllers/DataVisController");

router.get("/analytics", getUserAnalytics);

module.exports = router;
