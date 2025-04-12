const db = require("../config/db");
const { USER_TRACK_TABLE } = require("../routes/utils/constants");

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

    const insertQuery = `
      INSERT INTO ${USER_TRACK_TABLE}
      (ip_address, device_info, browser_info, section_viewed, interactions, entry_time, exit_time, time_spent, is_new_user)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        ip_address,
        device_info,
        browser_info,
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
