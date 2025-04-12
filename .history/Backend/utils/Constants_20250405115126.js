// utils/constants.js

// 📦 Table Names
const CONTACT_TABLE = "contact";
const USER_TRACK_TABLE = "user_tracking";

// 🔐 Admin Secret Key (optional if using env)
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// 🛠 Exporting
module.exports = {
  CONTACT_TABLE,
  USER_TRACK_TABLE,
  ADMIN_SECRET_KEY,
};
