const express = require("express");
const { trackUser } = require("../controllers/UserTrackingController");
const router = express.Router();

router.post("/track", trackUser);

module.exports = router;
