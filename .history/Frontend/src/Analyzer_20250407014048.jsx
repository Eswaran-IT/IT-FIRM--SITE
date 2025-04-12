import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found</p>;

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 px-4 py-6">
      <motion.h1
        className="text-2xl font-bold text-center mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Site Analytics
      </motion.h1>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StatCard title="Total Visitors" value={data.totalVisitors || 0} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.newUsers || 0} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.returningUsers || 0} icon="🔁" />
      </div>

      {/* Small Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Daily Visitors */}
        <motion.div className="bg-white p-4 rounded-2xl shadow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">📅 Visitors (7 Days)</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data.visitorsPerDay}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Visitors by Country */}
        <motion.div className="bg-white p-4 rounded-2xl shadow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">🌍 Country Visitors</h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data.visitorsByCountry}
                dataKey="count"
                nameKey="country"
                outerRadius={50}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {data.visitorsByCountry.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Sections */}
        <motion.div className="bg-white p-4 rounded-2xl shadow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">📂 Top Sections</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data.sectionCounts}>
              <XAxis dataKey="section" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Info */}
        <motion.div className="bg-white p-4 rounded-2xl shadow col-span-full lg:col-span-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">📱 Devices</h2>
          <ul className="text-xs text-gray-600 space-y-1">
            {data.deviceStats?.map((d, i) => (
              <li key={i}>🔸 {d.device} - {d.count}</li>
            ))}
          </ul>
        </motion.div>

        {/* OS Info */}
        <motion.div className="bg-white p-4 rounded-2xl shadow col-span-full lg:col-span-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">🖥️ OS</h2>
          <ul className="text-xs text-gray-600 space-y-1">
            {data.osStats?.map((os, i) => (
              <li key={i}>💻 {os.os} - {os.count}</li>
            ))}
          </ul>
        </motion.div>

        {/* Browser Info */}
        <motion.div className="bg-white p-4 rounded-2xl shadow col-span-full lg:col-span-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">🌐 Browsers</h2>
          <ul className="text-xs text-gray-600 space-y-1">
            {data.browserStats?.map((b, i) => (
              <li key={i}>🌍 {b.browser} - {b.count}</li>
            ))}
          </ul>
        </motion.div>

      </div>
    </div>
  );
};

export default Analyzer;
