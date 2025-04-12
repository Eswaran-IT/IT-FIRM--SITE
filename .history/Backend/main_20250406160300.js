// Load environment variables and initialize DB
require("dotenv").config();
require("./config/dbsetup"); // Run DB setup once at startup

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

//CORS 
app.use(cors({
  origin: "http://localhost:5173", // Update it later
  credentials: true,
}));

app.use(express.json());

// Routes
const contactRoute = require("./routes/ContactRoute");
const userTrackingRoute = require("./routes/UserTrackingRoute");
const analyticsRoute = require("./routes/DataVisRoute");
app.use("/", DRoute); 
app.use("/", contactRoute);
app.use("/", userTrackingRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
