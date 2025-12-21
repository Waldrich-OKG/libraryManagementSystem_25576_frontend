import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Overview() {
  const { auth } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const endpoint = auth?.role === "LIBRARIAN" ? "http://localhost:8080/stats/librarian" : "http://localhost:8080/stats/user";
    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch stats", err));
  }, [auth]);

  if (!stats) {
    return (
      <DashboardLayout>
        <p>Loading stats...</p>
      </DashboardLayout>
    );
  }

  // Chart data differs by role
  const chartData =
    auth?.role === "LIBRARIAN"
      ? {
          labels: ["Books", "Users", "Fines", "Borrowings", "Reservations"],
          datasets: [
            {
              label: "Library Stats",
              data: [
                stats.totalBooks,
                stats.totalUsers,
                stats.finesCollected,
                stats.borrowings,
                stats.reservations,
                stats.locations,
              ],
              backgroundColor: [
                "#3b82f6", // blue
                "#10b981", // green
                "#ef4444", // red
                "#8b5cf6", // purple
                "#f59e0b", // orange
                "#14b8a6", // teal
              ],
            },
          ],
        }
      : {
          labels: ["My Borrowings", "My Reservations", "My Fines"],
          datasets: [
            {
              label: "My Stats",
              data: [stats.borrowings, stats.reservations, stats.fines],
              backgroundColor: ["#3b82f6", "#f59e0b", "#ef4444"],
            },
          ],
        };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {auth?.role === "LIBRARIAN" ? (
          <>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">Total Books</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalBooks}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">Fines Collected</h3>
              <p className="text-3xl font-bold text-red-600">{stats.finesCollected}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">Borrowings</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.borrowings}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">Reservations</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.reservations}</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">My Borrowings</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.borrowings}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">My Reservations</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.reservations}</p>
            </div>
            <div className="bg-white shadow rounded p-6">
              <h3 className="text-lg font-semibold">My Fines</h3>
              <p className="text-3xl font-bold text-red-600">{stats.fines}</p>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-lg font-semibold mb-4">
          {auth?.role === "LIBRARIAN" ? "Library Statistics Overview" : "My Statistics Overview"}
        </h3>
        <Bar data={chartData} />
      </div>
    </DashboardLayout>
  );
}







