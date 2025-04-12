import db from "../config/db.js";

export const getUserAnalytics = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user_tracking");

    // Format and sanitize data
    const formattedData = rows.map((row) => {
      return {
        id: row.id,
        ip: row.ip_address || "Unknown",
        device: row.device_info || "N/A",
        browser: row.browser_info || "N/A",
        os: row.os_info || "N/A",
        referrer: row.referrer || "Direct",
        sections: JSON.parse(row.section_viewed || "[]"),
        actions: JSON.parse(row.interactions || "[]"),
        sessionId: row.session_id || "N/A",
        country: row.country || "Unknown",

        isNew: Boolean(row.is_new_user),
        timeSpent: row.time_spent || 0,

        entryTime: `${row.entry_date} ${row.entry_time}`,
        exitTime: `${row.exit_date} ${row.exit_time}`,
        visitTime: new Date(row.visit_time).toLocaleString(), // formatted
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving analytics data.",
    });
  }
};
