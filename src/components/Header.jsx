import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { auth } = useContext(AuthContext);
  const userInitial = auth?.email?.charAt(0).toUpperCase();

  return (
    <header className="flex justify-between items-center bg-blue-700 text-white px-6 py-3 shadow">
      <h1 className="text-xl font-bold">📚 My Library</h1>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-700 font-bold">
          {userInitial}
        </div>
        <span>{auth?.email}</span>
      </div>
    </header>
  );
}