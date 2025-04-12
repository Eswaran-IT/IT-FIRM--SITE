// Load environment variables and initialize DB
require("dotenv").config();
require("./config/dbsetup"); // Run DB setup once at startup

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const contactRoute = require("./routes/ContactRoute");
const userTrackingRoute = require("./routes/UserTrackingRoute"); // ✅ Add this

// Mount routes
app.use("/", contactRoute);
app.use("/", userTrackingRoute); // ✅ Mount user tracking route

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
