const express = require("express");
const { getAnalyticsData } = require("../controllers/DataVisController");

const router = express.Router();
router.get("/analytics", getUserAnalytics);

export default router;
