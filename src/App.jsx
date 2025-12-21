import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Overview from "./pages/Overview";
import BrowseBooks from "./pages/BrowseBooks";
import Fines from "./pages/Fines";
import Borrowings from "./pages/Borrowings";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import Locations from "./pages/Locations";



function ProtectedRoute({ children, role }) {
  const { auth } = React.useContext(AuthContext);
  if (!auth) return <Navigate to="/login" />;
  if (role && auth.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* Shared pages (User + Admin) */}
            <Route path="/overview" element={<Overview />} />
            <Route path="/books" element={<BrowseBooks />} />
            <Route path="/fines" element={<Fines />} />
            <Route path="/borrowings" element={<Borrowings />} />
            <Route path="/reservations" element={<Reservations />} />

            {/* Admin-only pages */}
            <Route path="/users" element={<Users />} />
            <Route path="/locations" element={<Locations />} />





            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user"
              element={
                <ProtectedRoute role="REGULAR">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="LIBRARIAN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}