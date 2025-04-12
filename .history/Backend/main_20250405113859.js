const express = require("express");
const cors = require("cors");
require("dotenv").config();
const contactRoute = require("./routes/ContactRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(contactRoute); // 👈 Register your contact route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
