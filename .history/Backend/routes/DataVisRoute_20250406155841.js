const express = require("express");
const router = express.Router();

const { getUserAnalytics } = require("../controllers/DataVisContoller");

router.get("/analytics", getUserAnalytics);

module.exports = router;
