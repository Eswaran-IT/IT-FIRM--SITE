// main.js
require("dotenv").config();
const { connectDB } = require("./config/db"); 
require("./config/dbsetup");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
const contactRoute = require("./routes/ContactRoute");
const userTrackingRoute = require("./routes/UserTrackingRoute");
const analyticsRoute = require("./routes/DataVisRoute");

app.use("/", analyticsRoute);
app.use("/", contactRoute);
app.use("/", userTrackingRoute);

//Connect DB THEN start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start server:", err.message);
});
