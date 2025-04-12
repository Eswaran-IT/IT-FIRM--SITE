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
  LabelList,
} from "recharts";
import { motion } from "framer-motion";

// Glassmorphism-style card
const StatCard = ({ title, value, icon }) => (
  <motion.div
    className="backdrop-blur-md bg-white/10 border border-white/20 p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center w-full sm:w-48 text-white hover:scale-105 transition"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <div className="text-sm text-indigo-200">{title}</div>
    <div className="text-2xl font-bold text-pink-400">{value}</div>
  </motion.div>
);

// Updated chart container
const ChartCard = ({ title, children }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow text-white w-full h-full hover:scale-[1.02] transition"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-sm font-medium mb-2 text-teal-300">{title}</h2>
    <div className="w-full h-44">{children}</div>
  </motion.div>
);

const Analyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeDevices = (devices = []) => {
    const grouped = { Mobile: 0, Tablet: 0, "Desktop/Laptop": 0 };
    devices.forEach(({ name = "", count = 0 }) => {
      const lower = name.toLowerCase();
      if (/mobile|iphone|android/.test(lower)) grouped["Mobile"] += count;
      else if (/tablet|ipad/.test(lower)) grouped["Tablet"] += count;
      else if (/windows|macbook|linux|desktop|laptop/.test(lower)) grouped["Desktop/Laptop"] += count;
    });
    return Object.entries(grouped).map(([name, count]) => ({ name, count }));
  };

  const normalizeOS = (osList = []) => {
    const grouped = { Windows: 0, "macOS / iOS": 0, "Android / Others": 0 };
    osList.forEach(({ name = "", count = 0 }) => {
      const lower = name.toLowerCase();
      if (/windows|win32/.test(lower)) grouped["Windows"] += count;
      else if (/mac|ios/.test(lower)) grouped["macOS / iOS"] += count;
      else if (/android|linux/.test(lower)) grouped["Android / Others"] += count;
    });
    return Object.entries(grouped).map(([name, count]) => ({ name, count }));
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/analytics`);
        const result = await res.json();

        const processedData = {
          ...result.data,
          devices: normalizeDevices(result.data.devices || []),
          os: normalizeOS(result.data.os || []),
          visitorsByCountry: (result.data.visitorsByCountry || []).map((entry) => ({
            ...entry,
            label: `${entry.country}: ${entry.count}`,
          })),
        };

        setData(processedData);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black px-4 py-5 font-sans">
      <motion.h1
        className="text-3xl font-extrabold text-center mb-6 text-indigo-300 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🌐 Analytics Dashboard
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} icon="🔁" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ChartCard title="📈 Visitors Over Time">
          <ResponsiveContainer>
            <BarChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" barSize={12} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🌍 Visitors by Country">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={data.visitorsByCountry || []}>
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="country" type="category" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey={(entry) => `${entry.country}: ${entry.count}`}
                  position="right"
                  fill="#fff"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="⏰ Peak Activity Hours">
          <ResponsiveContainer>
            <LineChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#fbbf24" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartCard title="📱 Device Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.devices || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#f87171" fill="#f87171" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🧭 Browser Stats">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.browsers || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#4ade80" fill="#4ade80" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="🖥️ Operating System">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.os || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analyzer;
