const express = require("express");
const { trackUser } = require("../controllers/UserrackingController");
const router = express.Router();

router.post("/track", trackUser);

module.exports = router;
