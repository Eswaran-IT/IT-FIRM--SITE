const db = require("../config/db"); // DB connection
const { USER_TRACK_TABLE } = require("../utils/Constants"); // Constants file to store the table name
const geoip = require("geoip-lite"); // 🌍 Country detection package added

const trackUser = async (req, res) => {
  try {
    const {
      session_id,
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
      country,
    } = req.body;

    // 📥 Log incoming data
    console.log("📥 Received tracking data:", req.body);

    // ❌ Validate required fields
    if (!entry_time || !exit_time || !session_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: session_id, entry_time, or exit_time",
      });
    }

    // 🌐 Get IP Address
    const ip_address =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || null;

    // 🌍 Auto-detect country from IP if not sent by frontend
    const geo = geoip.lookup(ip_address);
    const detectedCountry = geo?.country || null;
    const userCountry = country || detectedCountry;

    // 📅 Format Date and Time
    const formatDate = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formatTime = (date) => date.toTimeString().split(" ")[0]; // HH:MM:SS

    const entryDateObj = new Date(entry_time);
    const exitDateObj = new Date(exit_time);

    const formattedEntryDate = formatDate(entryDateObj);
    const formattedExitDate = formatDate(exitDateObj);
    const formattedEntryTime = formatTime(entryDateObj);
    const formattedExitTime = formatTime(exitDateObj);

    // 📦 Final data object
    const trackingData = {
      session_id,
      ip_address,
      country: userCountry,
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

    // ✅ Corrected Insert Query
    const sql = `
      INSERT INTO user_tracking (
        session_id, ip_address, country, device_info, browser_info, os_info,
        referrer, section_viewed, interactions, entry_date,
        entry_time, exit_date, exit_time, time_spent, is_new_user
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      trackingData.session_id,
      trackingData.ip_address,
      trackingData.country,
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

    // 🧠 Execute the query
    const conn = db.getConnection(); // Make sure you're using getConnection()
    const [result] = await conn.execute(sql, values); // using promise wrapper

    console.log("✅ Tracking data saved. ID:", result.insertId);
    return res.status(200).json({
      success: true,
      message: "User tracking data saved",
    });
  } catch (error) {
    console.error("Server Error:", error.stack || error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { trackUser };
