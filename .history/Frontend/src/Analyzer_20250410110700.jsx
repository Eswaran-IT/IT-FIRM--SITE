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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#34d399", "#10b981", "#2dd4bf", "#4ade80", "#3b82f6", "#f59e0b", "#ef4444"];

const StatCard = ({ title, value }) => (
  <motion.div
    className="bg-white/10 p-4 rounded-2xl shadow text-white w-full sm:w-44 text-center backdrop-blur"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-sm text-gray-300 mb-1">{title}</div>
    <div className="text-xl font-bold text-emerald-400">{value}</div>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <motion.div
    className="bg-white/5 p-3 rounded-xl text-white backdrop-blur"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-sm font-semibold mb-2 text-emerald-300">{title}</h2>
    <div className="h-40 md:h-48 xl:h-56">{children}</div>
  </motion.div>
);

const Analyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeDevices = (devices = []) => {
    const grouped = { Mobile: 0, Tablet: 0, Desktop: 0 };
    devices.forEach(({ name = "", count = 0 }) => {
      const lower = name.toLowerCase();
      if (/mobile|iphone|android/.test(lower)) grouped["Mobile"] += count;
      else if (/tablet|ipad/.test(lower)) grouped["Tablet"] += count;
      else grouped["Desktop"] += count;
    });
    return Object.entries(grouped).map(([name, count]) => ({ name, count }));
  };

  const normalizeOS = (osList = []) => {
    const grouped = { Windows: 0, macOS: 0, Others: 0 };
    osList.forEach(({ name = "", count = 0 }) => {
      const lower = name.toLowerCase();
      if (/windows/.test(lower)) grouped["Windows"] += count;
      else if (/mac|ios/.test(lower)) grouped["macOS"] += count;
      else grouped["Others"] += count;
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
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <motion.h1
        className="text-xl md:text-2xl font-bold text-center py-2 text-emerald-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Analytics Dashboard
      </motion.h1>

      {/* Stats Row */}
      <div className="flex justify-center flex-wrap gap-3 px-4 py-1">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 flex-grow overflow-hidden">
        <ChartCard title="Visitors Over Time">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" barSize={10} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Visitors by Country">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.visitorsByCountry || []}
                dataKey="count"
                nameKey="country"
                cx="50%"
                cy="40%"
                outerRadius="60%"
                fill="#34d399"
                label={({ country, count }) => `${country}: ${count}`}
              >
                {(data.visitorsByCountry || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Active Hours">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#ccc" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="#ccc" label={{ value: 'Number of Visitors', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} users`, "Visitors"]} />
              <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Device Usage">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.devices || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#4ade80" fill="#4ade80" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Browser Usage">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.browsers || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Operating Systems">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.os || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#34d399" fill="#34d399" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analyzer;
