import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon }) => (
  <motion.div
    className="bg-gray-900 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center w-full sm:w-48 text-white"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-sm text-gray-300">{title}</div>
    <div className="text-xl font-semibold text-indigo-400">{value}</div>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <motion.div
    className="bg-gray-900 p-3 rounded-2xl shadow w-full h-full text-white"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-xs font-semibold mb-2 text-indigo-300">{title}</h2>
    <div className="w-full h-44">{children}</div>
  </motion.div>
);

const Analyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/analytics`);
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const formatTime = (seconds) => {
    if (typeof seconds !== "number") return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-400">No data found</p>;

  return (
    <div className="min-h-screen bg-black px-4 py-4">
      <motion.h1
        className="text-2xl font-bold text-center mb-4 text-indigo-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Enhanced Analytics Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} icon="🔁" />
      </div>

      {/* 3 Updated Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 📈 Visitors Trend - AreaChart */}
        <ChartCard title="📈 Visitors Trend">
          <ResponsiveContainer>
            <AreaChart data={data.visitorsPerDay || []}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#06b6d4"
                fill="url(#trendGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 🌍 Country Visitors - Vertical BarChart */}
        <ChartCard title="🌍 Country Visitors">
          <ResponsiveContainer>
            <BarChart
              layout="vertical"
              data={data.visitorsByCountry || []}
              margin={{ top: 10, right: 15, left: 15, bottom: 5 }}
            >
              <XAxis type="number" stroke="#ccc" />
              <YAxis
                dataKey="country"
                type="category"
                stroke="#ccc"
                tick={{ fontSize: 12, fill: "#fff", fontWeight: "bold" }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" barSize={16} radius={[0, 6, 6, 0]}>
                <LabelList dataKey="count" position="right" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* ⏰ Peak Hours - BarChart instead of Line */}
        <ChartCard title="⏰ Peak Hours (24h)">
          <ResponsiveContainer>
            <BarChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="count" position="top" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analyzer;
