import React, { useEffect, useState } from "react";
import axios from "axios";

const cardData = [
  { key: "daily", label: "Daily Visitors" },
  { key: "weekly", label: "Weekly Visitors" },
  { key: "monthly", label: "Monthly Visitors" },
  { key: "yearly", label: "Yearly Visitors" },
  { key: "avgTime", label: "Avg Time Spent" },
];

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    avgTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/analytics");
        const analytics = res.data?.data || [];
        setData(analytics);
        calculateStats(analytics);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };
    fetchData();
  }, []);

  const calculateStats = (entries) => {
    const now = new Date();
    let daily = 0,
      weekly = 0,
      monthly = 0,
      yearly = 0,
      totalTime = 0;

    entries.forEach((entry) => {
      const visit = new Date(entry.visitTime);
      const diff = (now - visit) / (1000 * 60 * 60 * 24); // in days
      totalTime += Number(entry.timeSpent || 0);

      if (diff <= 1) daily++;
      if (diff <= 7) weekly++;
      if (diff <= 30) monthly++;
      if (diff <= 365) yearly++;
    });

    setTotals({
      daily,
      weekly,
      monthly,
      yearly,
      avgTime: Math.round(entries.length ? totalTime / entries.length : 0),
    });
  };

  const formatValue = (key, value) =>
    key === "avgTime" ? formatTime(value) : value;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}m ${remSecs}s`;
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Site Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {cardData.map(({ key, label }) => (
          <StatCard key={key} label={label} value={formatValue(key, totals[key])} />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-center items-center hover:shadow-lg transition">
    <h2 className="text-sm text-gray-500">{label}</h2>
    <p className="text-2xl font-semibold text-indigo-600 mt-1">{value}</p>
  </div>
);

export default AnalyticsDashboard;
