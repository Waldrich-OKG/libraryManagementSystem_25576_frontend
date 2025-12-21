import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-center py-3 mt-auto">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} My Library Management System
      </p>
    </footer>
  );
}