require("dotenv").config();
require("./config/dbsetup"); // 💡 This runs the DB setup

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

const contactRoute = require("./routes/ContactRoute");

app.use(cors());
app.use(express.json());
app.use("/", contactRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
