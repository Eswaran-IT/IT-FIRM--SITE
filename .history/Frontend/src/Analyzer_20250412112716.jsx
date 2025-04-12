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

const COLORS = [
  "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe",
  "#1e3a8a", "#2563eb", "#38bdf8", "#0ea5e9", "#0284c7", "#3b82f6"
];

const StatCard = ({ title, value }) => (
  <motion.div
    className="bg-blue-100 p-4 rounded-2xl shadow text-blue-800 w-full sm:w-44 text-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-sm text-blue-500 mb-1">{title}</div>
    <div className="text-xl font-bold text-blue-700">{value}</div>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <motion.div
    className="bg-blue-50 p-3 rounded-xl text-blue-900 shadow"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-sm font-semibold mb-2 text-blue-700">{title}</h2>
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
          visitorsByCountry: (result.data.visitorsByCountry || []).map((entry) => {
            const country = entry.country?.trim() || "Unknown";
            return {
              ...entry,
              country,
              label: `${country}: ${entry.count}`,
            };
          }),
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

  if (loading) return <p className="text-center mt-10 text-blue-700">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found</p>;

  return (
    <div className="h-screen w-full bg-white text-blue-900 flex flex-col overflow-hidden">
      <motion.h1
        className="text-xl md:text-2xl font-bold text-center py-2 text-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Analytics Dashboard
      </motion.h1>

      <div className="flex justify-center flex-wrap gap-3 px-4 py-1">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 flex-grow overflow-hidden">
        <ChartCard title="Visitors Over Time">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" stroke="#1e3a8a" />
              <YAxis stroke="#1e3a8a" />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" barSize={10} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Visitors by Country">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.visitorsByCountry}
                dataKey="count"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                labelLine={false}
                label={({ country }) => country}
              >
                {data.visitorsByCountry.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Active Hours">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#1e3a8a" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="#1e3a8a" label={{ value: 'Number of Visitors', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} users`, "Visitors"]} />
              <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Device Usage">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.devices || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#1e3a8a" />
              <Radar dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Browser Usage">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.browsers || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#1e3a8a" />
              <Radar dataKey="count" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Operating Systems">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.os || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#1e3a8a" />
              <Radar dataKey="count" stroke="#2563eb" fill="#2563eb" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analyzer;
