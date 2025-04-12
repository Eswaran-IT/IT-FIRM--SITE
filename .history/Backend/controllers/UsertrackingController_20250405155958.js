const db = require("../config/db"); // DB connection
const { USER_TRACK_TABLE } = require("../utils/Constants"); // Constants file to store the table name

const trackUser = (req, res) => {
  try {
    const {
      device_info,
      browser_info,
      os_info,
      referrer,
      section_viewed,
      interactions,
      entry_time,
      exit_time,
      time_spent,
      is_new_user,
    } = req.body;

    // Log the received data to verify
    console.log("📥 Received tracking data:", req.body);

    if (!entry_time || !exit_time) {
      return res.status(400).json({
        success: false,
        message: "Entry time and exit time are required",
      });
    }

    // 🧠 Get IP Address
    const ip_address =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || null;

    // ⏰ Format Entry and Exit Time
    const entryDateObj = new Date(entry_time);
    const exitDateObj = new Date(exit_time);

    const formatDate = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formatTime = (date) => date.toTimeString().split(" ")[0]; // HH:MM:SS

    const formattedEntryDate = formatDate(entryDateObj);
    const formattedEntryTime = formatTime(entryDateObj);
    const formattedExitDate = formatDate(exitDateObj);
    const formattedExitTime = formatTime(exitDateObj);

    // 📦 Final tracking data to be saved
    const trackingData = {
      ip_address,
      device_info: device_info || null,
      browser_info: browser_info || null,
      os_info: os_info || null,
      referrer: referrer || null,
      section_viewed: JSON.stringify(section_viewed || []),
      interactions: JSON.stringify(interactions || []),
      entry_date: formattedEntryDate,
      entry_time: formattedEntryTime,
      exit_date: formattedExitDate,
      exit_time: formattedExitTime,
      time_spent: time_spent || 0,
      is_new_user: is_new_user ? 1 : 0,
    };

    const insertQuery = `
      INSERT INTO ${USER_TRACK_TABLE}
      (
        ip_address, device_info, browser_info, os_info, referrer,
        section_viewed, interactions, entry_date, entry_time,
        exit_date, exit_time, time_spent, is_new_user
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      trackingData.ip_address,
      trackingData.device_info,
      trackingData.browser_info,
      trackingData.os_info,
      trackingData.referrer,
      trackingData.section_viewed,
      trackingData.interactions,
      trackingData.entry_date,
      trackingData.entry_time,
      trackingData.exit_date,
      trackingData.exit_time,
      trackingData.time_spent,
      trackingData.is_new_user,
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("❌ DB Error in trackUser:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      console.log("✅ Tracking data saved. ID:", result.insertId);
      return res.status(200).json({
        success: true,
        message: "User tracking data saved",
      });
    });
  } catch (error) {
    console.error("❌ Server Error:", error.stack || error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { trackUser };
