const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const contactRoute = require("./routes/ContactRoute");

app.use(cors());
app.use(express.json());

app.use("/", contactRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
