// userTrackingController.js
const db = require("../config/db"); // Assuming you have a db.js file to handle DB connection
const { USER_TRACK_TABLE } = require("../utils/constants");

// Save user tracking info
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

    // Make sure that entry_time and exit_time are in the correct format (Date or string)
    if (!entry_time || !exit_time) {
      return res.status(400).json({ success: false, message: "Entry time and exit time are required" });
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
        ip_address || null, // Allow null for ip_address if not provided
        device_info || null, // Allow null for device_info if not provided
        browser_info || null, // Allow null for browser_info if not provided
        JSON.stringify(section_viewed), // Ensure sections are stored as JSON
        JSON.stringify(interactions), // Ensure actions are stored as JSON
        entry_time, // The entry_time from frontend
        exit_time, // The exit_time from frontend
        time_spent, // The time spent in seconds
        is_new_user, // Whether it's a new user
      ],
      (err, result) => {
        if (err) {
          console.error("❌ MySQL Insert Error (User Tracking):", err);
          return res.status(500).json({ success: false, message: "Database error" });
        }

        // If successful, return a response
        return res.status(200).json({ success: true, message: "User tracking saved" });
      }
    );
  } catch (error) {
    console.error("❌ Server Error (trackUser):", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { trackUser };
