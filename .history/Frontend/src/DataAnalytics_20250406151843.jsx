import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [cards, setCards] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/analytics') // your backend API
      .then(res => {
        setAnalyticsData(res.data);
        computeCards(res.data);
      })
      .catch(err => console.error("Failed to fetch analytics:", err));
  }, []);

  const computeCards = (data) => {
    const now = new Date();
    let daily = 0, weekly = 0, monthly = 0, yearly = 0;
    let totalTime = 0;
    let newUsers = 0, returningUsers = 0;

    data.forEach((entry) => {
      const visitTime = new Date(entry.visit_time);
      const timeSpent = parseInt(entry.time_spent);
      totalTime += timeSpent;

      const diffDays = (now - visitTime) / (1000 * 60 * 60 * 24);

      if (diffDays <= 1) daily++;
      if (diffDays <= 7) weekly++;
      if (diffDays <= 30) monthly++;
      if (diffDays <= 365) yearly++;

      if (entry.is_new_user) newUsers++;
      else returningUsers++;
    });

    const avgTime = data.length ? (totalTime / data.length).toFixed(2) : 0;

    setCards({
      daily,
      weekly,
      monthly,
      yearly,
      avgTime,
      newUsers,
      returningUsers,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Analytics Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Daily Visitors" value={cards.daily} />
        <Card label="Weekly Visitors" value={cards.weekly} />
        <Card label="Monthly Visitors" value={cards.monthly} />
        <Card label="Yearly Visitors" value={cards.yearly} />
        <Card label="Avg Time Spent (sec)" value={cards.avgTime} />
        <Card label="New Users" value={cards.newUsers} />
        <Card label="Returning Users" value={cards.returningUsers} />
      </div>
    </div>
  );
};

const Card = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-md p-4 text-center">
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default DataAnalytics;
