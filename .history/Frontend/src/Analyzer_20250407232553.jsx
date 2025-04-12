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
  LabelList
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

// Convert hour like "13:00" → "01:00 PM"
const formatHourAMPM = (hour) => {
  try {
    const [h, m] = hour.split(":");
    const date = new Date();
    date.setHours(+h, +m);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  } catch {
    return hour;
  }
};

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
        📊 Enhanced Analytics Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} icon="🆕" />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} icon="🔁" />
      </div>

      {/* Key Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Visitors Trend (Year - Monthly) */}
        <ChartCard title="📈 Yearly Visitors (Per Month)">
          <ResponsiveContainer>
            <AreaChart data={data.visitorsPerMonth || []}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Visitors Trend (Month - Weekly) */}
        <ChartCard title="📆 Monthly Visitors (4 Weeks)">
          <ResponsiveContainer>
            <BarChart data={data.visitorsPerWeek || []}>
              <XAxis dataKey="week" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1">
                <LabelList dataKey="count" position="top" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Peak Hours */}
        <ChartCard title="⏰ Peak Hours (AM/PM)">
          <ResponsiveContainer>
            <LineChart
              data={(data.peakHours || []).map((d) => ({
                ...d,
                hour: formatHourAMPM(d.hour)
              }))}
            >
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4, fill: "#f59e0b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Country Breakdown */}
      <div className="mb-3">
        <ChartCard title="🌍 Country Breakdown (With Labels)">
          <ResponsiveContainer>
            <BarChart
              data={data.visitorsByCountry || []}
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 40 }}
            >
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="country" type="category" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" barSize={16} radius={[0, 6, 6, 0]}>
                <LabelList dataKey="count" position="right" fill="#fff" />
              </Bar>
            </BarChart>
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
