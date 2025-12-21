// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Import icons
import { FaHome, FaBook, FaMoneyBillAlt, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import { MdAssignment, MdLibraryBooks } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

export default function Sidebar() {
  const { auth, logout } = useContext(AuthContext);



  const links = [
    { path: "/overview", label: "Overview", roles: ["USER", "LIBRARIAN"], icon: <FaHome /> },
    { path: "/books", label: "Browse Books", roles: ["USER", "LIBRARIAN"], icon: <FaBook /> },
    { path: "/fines", label: "Fines", roles: ["USER", "LIBRARIAN"], icon: <FaMoneyBillAlt /> },
    { path: "/borrowings", label: "Borrowings", roles: ["USER", "LIBRARIAN"], icon: <MdAssignment /> },
    { path: "/reservations", label: "Reservations", roles: ["USER", "LIBRARIAN"], icon: <MdLibraryBooks /> },
    { path: "/users", label: "Users", roles: ["LIBRARIAN"], icon: <FaUsers /> },
    { path: "/locations", label: "Locations", roles: ["LIBRARIAN"], icon: <FaMapMarkerAlt /> },
  ];


//   const links = auth?.role === "LIBRARIAN" ? adminLinks : userLinks;
  const visibleLinks = links.filter(link => link.roles.includes(auth?.role));


  return (
    <aside className="w-64 bg-gray-100 h-full shadow-md flex flex-col justify-between">
      <nav className="p-4 space-y-2">
        {visibleLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-blue-200"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout at the bottom */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          <AiOutlineLogout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}








