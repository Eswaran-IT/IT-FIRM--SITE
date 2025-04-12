import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6666"];

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-center items-center text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-xl font-bold text-indigo-600">{value}</div>
  </div>
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

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading analytics...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found</p>;

  const totalVisitors = data.visitorsPerDay.reduce((sum, d) => sum + d.count, 0);
  const newUsers = data.userTypeStats?.newUsers || 0;
  const returningUsers = data.userTypeStats?.returningUsers || 0;
  const devices = data.deviceStats || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">📊 Site Analytics</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Visitors" value={totalVisitors} icon="👥" />
        <StatCard title="Avg Time Spent" value={formatTime(data.avgTimeSpent)} icon="⏱️" />
        <StatCard title="New Visitors" value={newUsers} icon="🆕" />
        <StatCard title="Returning Visitors" value={returningUsers} icon="🔁" />
      </div>

      {/* Device/Browser/OS */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📱 Device / OS / Browser Usage</h2>
        <ul className="space-y-2">
          {devices.map((item, i) => (
            <li key={i} className="flex justify-between text-gray-600 border-b pb-2">
              <span>{item.type}</span>
              <span className="font-semibold text-indigo-600">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visitors per Day (Chart) */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📆 Visitors (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.visitorsPerDay}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Visitors by Country (Pie) */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">🌍 Visitors by Country</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.visitorsByCountry}
              dataKey="count"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.visitorsByCountry.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Sections Viewed (Chart) */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📂 Top Sections Viewed</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.sectionCounts}>
            <XAxis dataKey="section" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analyzer;
