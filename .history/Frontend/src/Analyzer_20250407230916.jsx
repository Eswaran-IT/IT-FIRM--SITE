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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area
} from "recharts";
import { motion } from "framer-motion";

// Stat Card Component
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

// Chart Container
const ChartCard = ({ title, children }) => (
  <motion.div
    className="bg-gray-900 p-3 rounded-2xl shadow w-full h-full text-white"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-xs font-semibold mb-1 text-indigo-300">{title}</h2>
    <div className="w-full h-44">{children}</div>
  </motion.div>
);

// Main Component
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
    <div className="h-[100vh] overflow-hidden bg-black px-4 py-4">
      <motion.h1
        className="text-2xl font-bold text-center mb-3 text-indigo-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Compact Analytics Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} icon="🔁" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Line Chart */}
        <ChartCard title="📈 Visitors Trend">
          <ResponsiveContainer>
            <LineChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Country as Bar Race */}
        <ChartCard title="🌍 Country Breakdown (Bar Race Style)">
          <ResponsiveContainer>
            <BarChart data={data.visitorsByCountry || []} layout="vertical">
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="country" type="category" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" isAnimationActive animationDuration={800} radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Area Chart for Peak Hours */}
        <ChartCard title="⏰ Peak Hours">
          <ResponsiveContainer>
            <AreaChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Radar Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ChartCard title="📱 Device Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.devices || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🌐 Browser Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.browsers || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🖥️ OS Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.os || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analyzer;
