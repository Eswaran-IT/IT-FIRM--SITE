const { getConnection } = require("../config/db");

const getDetailedAnalytics = async (req, res) => {
  try {
    const db = getConnection();
    const [rows] = await db.query("SELECT * FROM user_tracking");

    const now = new Date();

    // 1. Visitors per Day (Last 7 Days)
    const visitorsPerDay = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];
      const count = rows.filter(row => new Date(row.entry_date).toISOString().split("T")[0] === dateStr).length;
      return { date: dateStr, count };
    });

    // 2. Visitors by Country
    const countryMap = {};
    rows.forEach(row => {
      const country = row.country || "Unknown";
      countryMap[country] = (countryMap[country] || 0) + 1;
    });
    const visitorsByCountry = Object.entries(countryMap).map(([country, count]) => ({ country, count }));

    // 3. Section Views
    const sectionMap = {};
    rows.forEach(row => {
      try {
        const viewed = JSON.parse(row.section_viewed || "[]");
        viewed.forEach(({ section }) => {
          sectionMap[section] = (sectionMap[section] || 0) + 1;
        });
      } catch (err) {
        console.error("Error parsing section_viewed:", err);
      }
    });
    const sectionCounts = Object.entries(sectionMap).map(([section, views]) => ({ section, views }));

    // 4. Average Time Spent
    const totalTimeSpent = rows.reduce((acc, row) => acc + (row.time_spent || 0), 0);
    const avgTimeSpent = rows.length ? Math.round(totalTimeSpent / rows.length) : 0;

    // 5. New vs Returning
    const newUsers = rows.filter(row => row.is_new_user === 1).length;
    const returningUsers = rows.length - newUsers;

    // 6. Peak Hours
    const hourMap = {};
    rows.forEach(row => {
      if (row.entry_time) {
        const hour = row.entry_time.split(":")[0];
        hourMap[hour] = (hourMap[hour] || 0) + 1;
      }
    });
    const peakHours = Object.entries(hourMap)
      .map(([hour, count]) => ({ hour: `${hour}:00`, count }))
      .sort((a, b) => a.hour - b.hour);

    // 7. Device / OS / Browser Stats
    const deviceMap = {}, osMap = {}, browserMap = {};
    rows.forEach(row => {
      deviceMap[row.device_info] = (deviceMap[row.device_info] || 0) + 1;
      osMap[row.os_info] = (osMap[row.os_info] || 0) + 1;
      browserMap[row.browser_info] = (browserMap[row.browser_info] || 0) + 1;
    });

    const mapToArray = (map) => Object.entries(map).map(([name, count]) => ({ name, count }));

    const totalVisitors = rows.length; // Calculate total visitors

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        visitorsPerDay,
        visitorsByCountry,
        sectionCounts,
        avgTimeSpent,
        userTypeStats: { newUsers, returningUsers },
        peakHours,
        devices: mapToArray(deviceMap),
        os: mapToArray(osMap),
        browsers: mapToArray(browserMap),
      }
    });

  } catch (error) {
    console.error("❌ Error in getDetailedAnalytics:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getDetailedAnalytics };
