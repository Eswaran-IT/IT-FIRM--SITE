import db from "../config/db.js"; // adjust the DB import if different

export const getUserAnalytics = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user_tracking");

    // Optional: process analytics here if needed

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
