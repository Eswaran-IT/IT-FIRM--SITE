// Load environment variables
require("dotenv").config();

// Initialize DB connection
require("./config/dbsetup");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Import routes
const contactRoute = require("./routes/ContactRoute");
const userTrackingRoute = require("./routes/UserTrackingRoute");
const dataVisRoute = require("./routes/DataVisRoute");

// Mount routes
app.use("/", contactRoute);
app.use("/", userTrackingRoute);
app.use("/", dataVisRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
