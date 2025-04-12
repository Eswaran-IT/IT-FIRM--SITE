import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Reusable Card Component
const StatCard = ({ title, value }) => (
  <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: 10, minWidth: 150 }}>
    <h4>{title}</h4>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
  </div>
);

const AdminAnalytics = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    newUsers: 0,
    avgTimeSpent: 0,
    todayVisitors: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics") // adjust to your route
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to fetch analytics", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Admin Analytics Dashboard</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <StatCard title="Total Visitors" value={stats.totalVisitors} />
        <StatCard title="New Users" value={stats.newUsers} />
        <StatCard title="Avg. Time Spent (s)" value={stats.avgTimeSpent} />
        <StatCard title="Today’s Visitors" value={stats.todayVisitors} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
