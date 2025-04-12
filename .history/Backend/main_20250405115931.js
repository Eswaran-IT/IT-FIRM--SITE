// Load environment variables and initialize DB
require("dotenv").config();
require("./config/dbsetup"); // Run DB setup once at startup

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
const contactRoute = require("./routes/ContactRoute");

// Middlewares
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/", contactRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
