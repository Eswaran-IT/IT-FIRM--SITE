import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#e11d48"];

const StatCard = ({ icon, title, value }) => (
  <motion.div
    className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center w-full sm:w-48"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-3xl mb-1">{icon}</div>
    <div className="text-gray-600 text-sm">{title}</div>
    <div className="text-xl font-semibold text-indigo-600">{value}</div>
  </motion.div>
);

const StatList = ({ title, items, icon }) => (
  <div className="bg-white p-4 rounded-2xl shadow col-span-full lg:col-span-1">
    <h2 className="text-sm font-semibold mb-2 text-gray-700">{icon} {title}</h2>
    <ul className="text-xs text-gray-600 space-y-1">
      {items?.map((item, i) => (
        <li key={i}>🔹 {item.name} - {item.count}</li>
      ))}
    </ul>
  </div>
);

const Analyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/analytics`);
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Analytics fetch error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (seconds) => {
    if (typeof seconds !== "number") return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-y-auto">
      <motion.h1
        className="text-2xl font-bold text-center mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Analytics Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StatCard icon="👥" title="Total Visitors" value={data.totalVisitors ?? "N/A"} />
        <StatCard icon="⏱️" title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} />
        <StatCard icon="🆕" title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} />
        <StatCard icon="🔁" title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} />
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Line Chart: Visitors Per Day */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">🗓️ Visitors Trend (7 Days)</h2>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={data.visitorsPerDay}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Country Breakdown */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">🌍 Country Visitors</h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data.visitorsByCountry}
                dataKey="count"
                nameKey="country"
                outerRadius={50}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {data.visitorsByCountry.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Section Views */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">📂 Section Views</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data.sectionCounts} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="section" width={80} />
              <Tooltip />
              <Bar dataKey="views" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Peak Hours */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm font-semibold mb-2 text-gray-700">⏰ Peak Hours</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data.peakHours}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device/OS/Browser Lists */}
        <StatList title="Devices" icon="📱" items={data.devices} />
        <StatList title="Operating Systems" icon="🖥️" items={data.os} />
        <StatList title="Browsers" icon="🌐" items={data.browsers} />

      </div>
    </div>
  );
};

export default Analyzer;
