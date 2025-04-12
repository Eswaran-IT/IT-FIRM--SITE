import React, { useEffect, useState } from "react";

const Analyzer = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/analytics`);
        const data = await response.json();
        setAnalytics(data.data); 
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">📊 Site Analytics</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : analytics ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card title="Daily Visitors" value={analytics.dailyVisitors} />
          <Card title="Weekly Visitors" value={analytics.weeklyVisitors} />
          <Card title="Monthly Visitors" value={analytics.monthlyVisitors} />
          <Card title="Yearly Visitors" value={analytics.yearlyVisitors} />
          <Card title="Avg Time Spent" value={formatTime(analytics.avgTimeSpent)} />
        </div>
      ) : (
        <p className="text-center text-red-500">No analytics data available.</p>
      )}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
    <h4 className="text-xl font-semibold text-gray-700 mb-2">{title}</h4>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

export default Analyzer;
