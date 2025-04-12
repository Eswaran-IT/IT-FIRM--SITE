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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#e11d48"];

const StatCard = ({ title, value, icon }) => (
  <motion.div
    className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center w-full sm:w-48"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-gray-600 text-sm">{title}</div>
    <div className="text-xl font-semibold text-indigo-600">{value}</div>
  </motion.div>
);

const ChartContainer = ({ title, children }) => (
  <motion.div
    className="bg-white p-4 rounded-2xl shadow w-full h-64"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-sm font-semibold mb-2 text-gray-700">{title}</h2>
    <div className="w-full h-48">{children}</div>
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found</p>;

  return (
    <div className="h-[100vh] overflow-y-auto bg-gray-100 px-4 py-6">
      <motion.h1
        className="text-2xl font-bold text-center mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Analytics Overview
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? 'N/A'} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? 'N/A'} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? 'N/A'} icon="🔁" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ChartContainer title="🗓️ Visitors Trend (7 Days)">
          <ResponsiveContainer>
            <LineChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="🌍 Visitors by Country">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data.visitorsByCountry || []}
                dataKey="count"
                nameKey="country"
                outerRadius={70}
                label={({ name }) => name}
              >
                {(data.visitorsByCountry || []).map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="📂 Section Views">
          <ResponsiveContainer>
            <BarChart data={data.sectionCounts || []} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="section" width={70} />
              <Tooltip />
              <Bar dataKey="views" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="⏰ Peak Hours">
          <ResponsiveContainer>
            <BarChart data={data.peakHours || []}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="📱 Device Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={90} data={data.devices || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar name="Devices" dataKey="count" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="🖥️ OS Distribution">
          <ResponsiveContainer>
            <RadarChart outerRadius={90} data={data.os || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar name="OS" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="🌐 Browser Stats">
          <ResponsiveContainer>
            <RadarChart outerRadius={90} data={data.browsers || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar name="Browsers" dataKey="count" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Analyzer;