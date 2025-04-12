import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6666"];

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">📊 Site Analytics</h1>

      {/* 1. Visitors per Day */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
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

      {/* 2. Visitors by Country */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
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

      {/* 3. Section Views */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📂 Section Views</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.sectionCounts}>
            <XAxis dataKey="section" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Avg Time Spent */}
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">⏱️ Avg Time Spent</h2>
        <p className="text-2xl font-bold text-indigo-600">{formatTime(data.avgTimeSpent)}</p>
      </div>
    </div>
  );
};

export default Analyzer;
