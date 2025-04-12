import React, { useEffect, useState } from "react";
import axios from "axios";

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
        const analytics = res.data.data || [];
        setData(analytics);
        calculateStats(analytics);
      } catch (error) {
        console.error("Error fetching analytics", error);
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
      const visitDate = new Date(entry.visitTime);
      const diffDays = (now - visitDate) / (1000 * 60 * 60 * 24);
      totalTime += Number(entry.timeSpent || 0);

      if (diffDays <= 1) daily++;
      if (diffDays <= 7) weekly++;
      if (diffDays <= 30) monthly++;
      if (diffDays <= 365) yearly++;
    });

    const avgTime = entries.length ? (totalTime / entries.length) : 0;

    setTotals({
      daily,
      weekly,
      monthly,
      yearly,
      avgTime: Math.round(avgTime),
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Daily Visitors" value={totals.daily} />
      <Card title="Weekly Visitors" value={totals.weekly} />
      <Card title="Monthly Visitors" value={totals.monthly} />
      <Card title="Yearly Visitors" value={totals.yearly} />
      <Card title="Avg Time Spent" value={formatTime(totals.avgTime)} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-2xl p-4 text-center">
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);

export default AnalyticsDashboard;
