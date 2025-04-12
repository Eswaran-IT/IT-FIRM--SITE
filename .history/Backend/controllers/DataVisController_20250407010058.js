const db = require("../config/db");

const getUserAnalytics = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user_tracking");

    const now = new Date();

    const dailyVisitors = rows.filter(row => {
      const date = new Date(row.entry_date);
      return date.toDateString() === now.toDateString();
    }).length;

    const weeklyVisitors = rows.filter(row => {
      const date = new Date(row.entry_date);
      const diff = (now - date) / (1000 * 60 * 60 * 24); // in days
      return diff <= 7;
    }).length;

    const monthlyVisitors = rows.filter(row => {
      const date = new Date(row.entry_date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    const yearlyVisitors = rows.filter(row => {
      const date = new Date(row.entry_date);
      return date.getFullYear() === now.getFullYear();
    }).length;

    const totalTimeSpent = rows.reduce((acc, row) => acc + (row.time_spent || 0), 0);
    const avgTimeSpent = rows.length ? Math.round(totalTimeSpent / rows.length) : 0;

    res.status(200).json({
      success: true,
      analytics: {
        dailyVisitors,
        weeklyVisitors,
        monthlyVisitors,
        yearlyVisitors,
        avgTimeSpent,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({
      success: false,
      message: "Error retrieving analytics data.",
    });
  }
};

module.exports = {
  getUserAnalytics,
};
