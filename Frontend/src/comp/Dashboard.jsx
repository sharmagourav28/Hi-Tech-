// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
import Header from "./Header"; // Make sure Header component exists

const Dashboard = () => {
  const [stats, setStats] = useState({
    hydroUsers: 0,
    pdiUsers: 0,
    admins: 0,
    hydroTestsDone: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/total-stats");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(); // Call fetchStats on component mount
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchStats(); // Call fetchStats again on retry
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div> {/* Placeholder for loading spinner */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div>Error: {error}</div>
        <button
          onClick={handleRetry}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <Header />
      <h1 className="text-2xl font-semibold mb-4 text-center">Hello Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105">
          <h2 className="text-lg font-medium text-black">HYDRO Users</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {stats.hydroUsers}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105">
          <h2 className="text-lg font-medium text-black">PDI Users</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {stats.pdiUsers}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105">
          <h2 className="text-lg font-medium text-black">Admins</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {stats.admins}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105">
          <h2 className="text-lg font-medium text-black">Hydro Tests Done</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {stats.hydroTestsDone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
