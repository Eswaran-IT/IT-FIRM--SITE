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
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#e11d48"];

const StatCard = ({ icon, title, value }) => (
  <motion.div
    className="bg-white rounded-2xl shadow p-6 w-full flex flex-col justify-center items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-indigo-600 mt-1">{value}</p>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="h-60">{children}</div>
  </div>
);

const Analyzer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/analytics");
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!data) return <div className="text-center py-10 text-red-500">Failed to load data.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="👥" title="Total Visitors" value={data.totalVisitors ?? "-"} />
        <StatCard icon="⏱️" title="Avg Time Spent" value={`${Math.floor(data.avgTimeSpent / 60)}m ${data.avgTimeSpent % 60}s`} />
        <StatCard icon="🆕" title="New Users" value={data.userTypeStats?.newUsers ?? "-"} />
        <StatCard icon="🔁" title="Returning Users" value={data.userTypeStats?.returningUsers ?? "-"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ChartCard title="Visitors Over Last 7 Days">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.visitorsPerDay}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="count" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Country Wise Visitors">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="count"
                nameKey="country"
                data={data.visitorsByCountry}
                outerRadius={80}
                label
              >
                {data.visitorsByCountry.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Section Views">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.sectionCounts} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="section" />
              <Tooltip />
              <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Peak Hours">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.peakHours}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Device Usage">
          <ul className="space-y-1 text-sm text-gray-600">
            {data.devices?.map((d, i) => (
              <li key={i}>📱 {d.name}: {d.count}</li>
            ))}
          </ul>
        </ChartCard>

        <ChartCard title="OS & Browser Stats">
          <ul className="space-y-1 text-sm text-gray-600">
            {data.os?.map((os, i) => (
              <li key={i}>🖥 {os.name}: {os.count}</li>
            ))}
            {data.browsers?.map((b, i) => (
              <li key={i}>🌐 {b.name}: {b.count}</li>
            ))}
          </ul>
        </ChartCard>
      </div>
    </div>
  );
};

export default Analyzer;
