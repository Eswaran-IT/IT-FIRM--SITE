import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6666"];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

const SectionCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow mb-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
    {children}
  </div>
);

const BreakdownList = ({ title, data }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h3 className="text-md font-semibold mb-3 text-gray-700">{title}</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      {data.map((item, idx) => (
        <li key={idx} className="flex justify-between">
          <span>{item.name}</span>
          <span className="font-medium">{item.count}</span>
        </li>
      ))}
    </ul>
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

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading analytics...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No data found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">📊 Site Analytics</h1>

      {/* 1. Visitors Per Day */}
      <SectionCard title="📆 Visitors Over Time (Last 7 Days)">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.visitorsPerDay}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* 2. Visitors by Country */}
      <SectionCard title="🌍 Visitors by Country">
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
      </SectionCard>

      {/* 3. Section Views */}
      <SectionCard title="📂 Top Sections Viewed">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.sectionCounts}>
            <XAxis dataKey="section" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* 4. Average Time Spent */}
      <SectionCard title="⏱️ Average Time Spent">
        <p className="text-2xl font-bold text-indigo-600 text-center">{formatTime(data.avgTimeSpent)}</p>
      </SectionCard>

      {/* 5. New vs Returning Visitors */}
      <SectionCard title="🆕 New vs Returning Visitors">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={[
                { name: "New Visitors", value: data.userTypeStats.newUsers },
                { name: "Returning Visitors", value: data.userTypeStats.returningUsers },
              ]}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              <Cell fill="#00C49F" />
              <Cell fill="#FF8042" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* 6. Peak Hours of Traffic */}
      <SectionCard title="📈 Peak Hours of Traffic">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.peakHours}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* 7. Device / OS / Browser Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BreakdownList title="📱 Device Breakdown" data={data.devices} />
        <BreakdownList title="🖥️ OS Breakdown" data={data.os} />
        <BreakdownList title="🌐 Browser Breakdown" data={data.browsers} />
      </div>
    </div>
  );
};

export default Analyzer;
