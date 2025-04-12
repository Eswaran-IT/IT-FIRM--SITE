// userTrackingController.js
const db = require("../config/db"); 
const { USER_TRACK_TABLE } = require("../utils/constants");

const trackUser = (req, res) => {
  try {
    const {
      ip_address,
      device_info,
      browser_info,
      section_viewed,
      interactions,
      entry_time,
      exit_time,
      time_spent,
      is_new_user,
    } = req.body;

    // Validation
    if (!entry_time || !exit_time) {
      return res.status(400).json({ success: false, message: "Entry time and exit time are required" });
    }

    if (isNaN(new Date(entry_time).getTime()) || isNaN(new Date(exit_time).getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    if (!Array.isArray(section_viewed) || !Array.isArray(interactions)) {
      return res.status(400).json({ success: false, message: "Sections and interactions must be arrays" });
    }

    if (typeof is_new_user !== 'boolean') {
      return res.status(400).json({ success: false, message: "is_new_user must be a boolean" });
    }

    const insertQuery = `
      INSERT INTO ${USER_TRACK_TABLE}
      (ip_address, device_info, browser_info, section_viewed, interactions, entry_time, exit_time, time_spent, is_new_user)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert data into the database
    db.query(
      insertQuery,
      [
        ip_address || null,
        device_info || null,
        browser_info || null,
        JSON.stringify(section_viewed),
        JSON.stringify(interactions),
        entry_time,
        exit_time,
        time_spent,
        is_new_user,
      ],
      (err, result) => {
        if (err) {
          console.error("❌ MySQL Insert Error (User Tracking):", err);
          return res.status(500).json({ success: false, message: "Database error" });
        }

        return res.status(200).json({ success: true, message: "User tracking saved" });
      }
    );
  } catch (error) {
    console.error("❌ Server Error (trackUser):", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { trackUser };
