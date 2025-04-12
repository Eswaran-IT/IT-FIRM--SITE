const { getConnection } = require("../config/db");

const getDetailedAnalytics = async (req, res) => {
  try {
    const db = getConnection();
    const [rows] = await db.query("SELECT * FROM user_tracking");

    const now = new Date();

    // === 1. Visitors per last 7 days ===
    const visitorsPerDay = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];

      const count = rows.filter(row => {
        const entryDate = new Date(row.entry_date);
        return entryDate.toISOString().split("T")[0] === dateStr;
      }).length;

      return {
        date: dateStr,
        count
      };
    });

    // === 2. Visitors by Country ===
    const countryMap = {};
    rows.forEach(row => {
      const country = row.country || "Unknown";
      countryMap[country] = (countryMap[country] || 0) + 1;
    });

    const visitorsByCountry = Object.entries(countryMap).map(([country, count]) => ({
      country,
      count
    }));

    // === 3. Top Viewed Sections ===
    const sectionMap = {};
    rows.forEach(row => {
      try {
        const viewed = JSON.parse(row.section_viewed || "[]");
        viewed.forEach(({ section }) => {
          sectionMap[section] = (sectionMap[section] || 0) + 1;
        });
      } catch (err) {
        console.warn("Invalid section_viewed JSON:", err.message);
      }
    });

    const sectionCounts = Object.entries(sectionMap).map(([section, views]) => ({
      section,
      views
    }));

    // === 4. Average Time Spent (optional) ===
    const totalTimeSpent = rows.reduce((acc, row) => acc + (row.time_spent || 0), 0);
    const avgTimeSpent = rows.length ? Math.round(totalTimeSpent / rows.length) : 0;

    // ✅ Respond
    res.status(200).json({
      success: true,
      data: {
        visitorsPerDay,
        visitorsByCountry,
        sectionCounts,
        avgTimeSpent
      }
    });

  } catch (error) {
    console.error("❌ Error in getDetailedAnalytics:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getDetailedAnalytics,
};
