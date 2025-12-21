import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Locations() {
  const { auth } = useContext(AuthContext);

  return (
    <DashboardLayout>
      {auth?.role === "LIBRARIAN" ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Library Locations</h2>
          <p>Manage library branches and their inventories.</p>
        </>
      ) : (
        <p className="text-red-600">Unauthorized: Only admins can view this page.</p>
      )}
    </DashboardLayout>
  );
}