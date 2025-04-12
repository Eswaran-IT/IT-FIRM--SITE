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

const StatCard = ({ title, value }) => (
  <motion.div
    className="bg-white/10 p-5 rounded-2xl shadow-md text-white w-full sm:w-44 text-center backdrop-blur-md"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="text-sm text-gray-300 mb-1">{title}</div>
    <div className="text-2xl font-bold text-emerald-400">{value}</div>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <motion.div
    className="bg-white/5 p-4 rounded-2xl text-white h-full w-full backdrop-blur-md"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h2 className="text-sm font-semibold mb-2 text-emerald-300">{title}</h2>
    <div className="w-full h-full">{children}</div>
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
    <div className="h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 px-4 py-3 flex flex-col">
      <motion.h1
        className="text-2xl font-bold text-center mb-4 text-emerald-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Analytics Dashboard
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-2">
        <StatCard title="Total Visitors" value={data.totalVisitors ?? "N/A"} />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} />
        <StatCard title="New Visitors" value={data.userTypeStats?.newUsers ?? "N/A"} />
        <StatCard title="Returning Visitors" value={data.userTypeStats?.returningUsers ?? "N/A"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        <ChartCard title="Visitors Over Time">
          <ResponsiveContainer>
            <BarChart data={data.visitorsPerDay || []}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" barSize={12} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Visitors by Country">
          <ResponsiveContainer>
            <BarChart
              layout="vertical"
              data={data.visitorsByCountry || []}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="country" type="category" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" barSize={14} radius={[0, 4, 4, 0]}>
                <LabelList dataKey="label" position="right" fill="#fff" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Active Hours">
          <ResponsiveContainer>
            <LineChart data={data.peakHours || []}>
              <XAxis dataKey="hour" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <ChartCard title="Device Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.devices || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#4ade80" fill="#4ade80" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Browser Usage">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.browsers || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" stroke="#ccc" />
              <Radar dataKey="count" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Operating Systems">
          <ResponsiveContainer>
            <RadarChart outerRadius={60} data={data.os || []}>
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
