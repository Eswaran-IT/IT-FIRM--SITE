const express = require("express");
const { getUserAnalytics } = require("../controllers/DataVisController");

const router = express.Router();
router.get("/analytics", getUserAnalytics);

module.exports = router;
const express = require("express");
const { getDetailedAnalytics } = require("../controllers/DataVisController");

const router = express.Router();

router.get("/analytics/summary", getDetailedAnalytics);

module.exports = router;
