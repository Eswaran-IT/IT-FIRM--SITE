const express = require("express");
const router = express.Router();

const { getUserAnalytics } = require("../controllers/");

router.get("/analytics", getUserAnalytics);

module.exports = router;
