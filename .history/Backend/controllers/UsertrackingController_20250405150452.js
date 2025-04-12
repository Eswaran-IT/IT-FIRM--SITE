const db = require("../config/db");
const { USER_TRACK_TABLE } = require("../utils/Constants");

// Save user tracking info
const trackUser = (req, res) => {
  try {
    const {
      device_info,
      browser_info,
      entry_time,
      exit_time,
      time_spent,
      is_new_user,
    } = req.body;

    // Log received data
    console.log("📥 Received user tracking data:", req.body);

    // Validate required fields
    if (!entry_time || !exit_time) {
      console.warn("⚠️ Missing entry or exit time");
      return res.status(400).json({
        success: false,
        message: "Entry time and exit time are required",
      });
    }

    const insertQuery = `
      INSERT INTO ${USER_TRACK_TABLE}
      (device_info, browser_info, entry_time, exit_time, time_spent, is_new_user)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        device_info || null,
        browser_info || null,
        entry_time,
        exit_time,
        time_spent,
        is_new_user,
      ],
      (err, result) => {
        if (err) {
          console.error("❌ MySQL Insert Error (User Tracking):", err);
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        console.log("✅ User tracking data saved successfully. Insert ID:", result.insertId);
        return res.status(200).json({
          success: true,
          message: "User tracking saved",
        });
      }
    );
  } catch (error) {
    console.error("❌ Server Error (trackUser):", error.stack || error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { trackUser };
