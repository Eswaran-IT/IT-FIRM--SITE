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
  Area,
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
    <h2 className="text-xs font-semibold mb-1 text-indigo-300">{title}</h2>
    <div className="w-full h-44">{children}</div>
  </motion.div>
);

const Analyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Normalize devices into 3 categories
  const normalizeDevices = (devices = []) => {
    return devices.reduce((acc, item) => {
      let category = "Other";

      if (/mobile|iphone|android/i.test(item.name)) {
        category = "Mobile";
      } else if (/tablet|ipad/i.test(item.name)) {
        category = "Tablet";
      } else if (/windows|macbook|linux|desktop|laptop/i.test(item.name)) {
        category = "Desktop/Laptop";
      }

      const existing = acc.find((d) => d.name === category);
      if (existing) {
        existing.count += item.count;
      } else {
        acc.push({ name: category, count: item.count });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/analytics`);
        const result = await res.json();

        // Normalize device data
        result.data.devices = normalizeDevices(result.data.devices);
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

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} icon="🔁" />
      </div>

      {/* Top 3 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Visitors Trend */}
        <ChartCard title="📈 Visitors Trend">
          <ResponsiveContainer>
            <BarChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" barSize={12} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Country Visitors - Horizontal Bar Chart */}
        <ChartCard title="🌍 Country Visitors">
          <ResponsiveContainer>
            <BarChart
              layout="vertical"
              data={data.visitorsByCountry || []}
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="country" type="category" stroke="#ccc" />
              <Tooltip formatter={(value) => [`${value} visitors`]} />
              <Bar dataKey="count" fill="#10b981" barSize={14} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Peak Hours - Line Chart */}
        <ChartCard title="📅 Peak Hours (24h)">
          <ResponsiveContainer>
            <LineChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Radar Charts */}
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
