const { getConnection } = require("../config/db"); // Get promise-based connection
const { USER_TRACK_TABLE } = require("../utils/Constants");
const geoip = require("geoip-lite"); // 🌍 Country detection package

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

    console.log("📥 Received tracking data:", req.body);

    // ❌ Required field validation
    if (!entry_time || !exit_time || !session_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: session_id, entry_time, or exit_time",
      });
    }

    const ip_address =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || null;

    const geo = geoip.lookup(ip_address);
    const detectedCountry = geo?.country || null;
    const userCountry = country || detectedCountry;

    const formatDate = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD
    const formatTime = (date) => date.toTimeString().split(" ")[0]; // HH:MM:SS

    const entryDateObj = new Date(entry_time);
    const exitDateObj = new Date(exit_time);

    const formattedEntryDate = formatDate(entryDateObj);
    const formattedExitDate = formatDate(exitDateObj);
    const formattedEntryTime = formatTime(entryDateObj);
    const formattedExitTime = formatTime(exitDateObj);

    const sql = `
      INSERT INTO ${USER_TRACK_TABLE} (
        session_id, ip_address, country, device_info, browser_info, os_info,
        referrer, section_viewed, interactions, date,
        entry_time, exit_time, time_spent, is_new_user
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      session_id,
      ip_address,
      userCountry,
      device_info || null,
      browser_info || null,
      os_info || null,
      referrer || null,
      JSON.stringify(section_viewed || []),
      JSON.stringify(interactions || []),
      formattedEntryDate,
      `${formattedEntryDate} ${formattedEntryTime}`,
      `${formattedExitDate} ${formattedExitTime}`,
      time_spent || 0,
      is_new_user ? 1 : 0,
    ];

    const db = getConnection();
    const [result] = await db.execute(sql, values);

    console.log("✅ Tracking data saved. ID:", result.insertId);
    return res.status(200).json({
      success: true,
      message: "User tracking data saved",
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
