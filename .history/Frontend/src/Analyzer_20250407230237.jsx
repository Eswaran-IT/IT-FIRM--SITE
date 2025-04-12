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
  Radar,
  AreaChart,
  Area,
  Treemap,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#e11d48"];

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

const ChartContainer = ({ title, children }) => (
  <motion.div
    className="bg-gray-900 p-4 rounded-2xl shadow w-full h-72 text-white"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-sm font-semibold mb-2 text-indigo-300">{title}</h2>
    <div className="w-full h-56">{children}</div>
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
    <div className="h-[100vh] overflow-y-auto bg-black px-4 py-6">
      <motion.h1
        className="text-3xl font-bold text-center mb-6 text-indigo-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Analytics Dashboard
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? 'N/A'} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? 'N/A'} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? 'N/A'} icon="🔁" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ChartContainer title="📅 Visitors Trend (7 Days)">
          <ResponsiveContainer>
            <LineChart data={data.visitorsPerDay || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="🌍 Country Breakdown">
          <ResponsiveContainer>
            <BarChart data={data.visitorsByCountry || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" stroke="#ccc" />
              <YAxis dataKey="count" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="📂 Section Views">
          <ResponsiveContainer>
            <BarChart data={data.sectionCounts || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" stroke="#ccc" />
              <YAxis type="category" dataKey="section" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="views" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="⏰ Peak Hours (24h Graph)">
          <ResponsiveContainer>
            <AreaChart data={data.peakHours || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="📱 Device Usage">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data.devices || []} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#ef4444" label>
                {data.devices?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="🖥️ OS Usage">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data.os || []} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#3b82f6" label>
                {data.os?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="🌐 Browser Usage">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data.browsers || []} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#10b981" label>
                {data.browsers?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Analyzer;