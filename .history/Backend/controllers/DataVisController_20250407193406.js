const { getConnection } = require("../config/db");

const getDetailedAnalytics = async (req, res) => {
  try {
    const db = getConnection();
    const [rows] = await db.query("SELECT * FROM user_tracking");

    // 🔍 Apply Filters from Query Params
    let filteredRows = [...rows];
    const { startDate, endDate, country, device, userType, section } = req.query;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredRows = filteredRows.filter(row => {
        const date = new Date(row.entry_date);
        return date >= start && date <= end;
      });
    }

    if (country) {
      filteredRows = filteredRows.filter(row => (row.country || "Unknown") === country);
    }

    if (device) {
      filteredRows = filteredRows.filter(row => row.device_info === device);
    }

    if (userType === "new") {
      filteredRows = filteredRows.filter(row => row.is_new_user === 1);
    } else if (userType === "returning") {
      filteredRows = filteredRows.filter(row => row.is_new_user === 0);
    }

    if (section) {
      filteredRows = filteredRows.filter(row => {
        try {
          const viewed = JSON.parse(row.section_viewed);
          return Array.isArray(viewed) && viewed.some(v => v.section === section);
        } catch {
          return false;
        }
      });
    }

    const now = new Date();

    // 🗓 Visitors per Day (Last 7 Days)
    const visitorsPerDay = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - i));
      const dateStr = date.toISOString().split("T")[0];
      const count = filteredRows.filter(row => new Date(row.entry_date).toISOString().split("T")[0] === dateStr).length;
      return { date: dateStr, count };
    });

    // 🌎 Visitors by Country
    const countryMap = {};
    filteredRows.forEach(row => {
      const country = row.country || "Unknown";
      countryMap[country] = (countryMap[country] || 0) + 1;
    });
    const visitorsByCountry = Object.entries(countryMap).map(([country, count]) => ({ country, count }));

    // 📊 Section Views
    const sectionMap = {};
    filteredRows.forEach(row => {
      let viewed = [];
      try {
        viewed = JSON.parse(row.section_viewed);
        if (!Array.isArray(viewed)) viewed = [];
      } catch (err) {
        viewed = [];
      }
      viewed.forEach(({ section }) => {
        if (section) sectionMap[section] = (sectionMap[section] || 0) + 1;
      });
    });
    const sectionCounts = Object.entries(sectionMap).map(([section, views]) => ({ section, views }));

    // ⏱ Avg Time
    const totalTimeSpent = filteredRows.reduce((acc, row) => acc + (row.time_spent || 0), 0);
    const avgTimeSpent = filteredRows.length ? Math.round(totalTimeSpent / filteredRows.length) : 0;

    // 🔁 New vs Returning
    const newUsers = filteredRows.filter(row => row.is_new_user === 1).length;
    const returningUsers = filteredRows.length - newUsers;

    // ⏰ Peak Hours
    const hourMap = {};
    filteredRows.forEach(row => {
      if (row.entry_time) {
        const hour = row.entry_time.split(":")[0];
        hourMap[hour] = (hourMap[hour] || 0) + 1;
      }
    });
    const peakHours = Object.entries(hourMap)
      .map(([hour, count]) => ({ hour: `${hour}:00`, count }))
      .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

    // 💻 Device / OS / Browser
    const deviceMap = {}, osMap = {}, browserMap = {};
    filteredRows.forEach(row => {
      deviceMap[row.device_info] = (deviceMap[row.device_info] || 0) + 1;
      osMap[row.os_info] = (osMap[row.os_info] || 0) + 1;
      browserMap[row.browser_info] = (browserMap[row.browser_info] || 0) + 1;
    });

    const mapToArray = (map) => Object.entries(map).map(([name, count]) => ({ name, count }));

    // 🎯 Final Result
    res.status(200).json({
      success: true,
      data: {
        totalVisitors: filteredRows.length,
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
