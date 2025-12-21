import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";

export default function Reservations() {
  const { auth } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("reservationId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchColumn, setSearchColumn] = useState("reservationId");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const baseUrl = "http://localhost:8080/reservations";
    const endpoint = searchKeyword
      ? `${baseUrl}/search?column=${searchColumn}&keyword=${searchKeyword}&page=${page}&size=10`
      : `${baseUrl}/all?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`;

    axios
      .get(endpoint, { headers: { Authorization: `Bearer ${auth?.accessToken}` } })
      .then((res) => {
        setReservations(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Failed to fetch reservations", err));
  }, [auth, page, sortBy, sortDirection, searchColumn, searchKeyword]);

  const columns = [
    { value: "reservationId", label: "Reservation ID" },
    { value: "bookTitle", label: "Book Title" },
    { value: "userEmail", label: "User Email" },
    { value: "status", label: "Status" }
  ];

  const renderRow = (reservation, onEdit, onDelete) => (
    <tr key={reservation.reservationId} className="border-b">
      <td className="px-4 py-2">{reservation.reservationId}</td>
      <td className="px-4 py-2">{reservation.bookTitle}</td>
      <td className="px-4 py-2">{reservation.userEmail}</td>
      <td className="px-4 py-2">{reservation.status}</td>
      <td className="px-4 py-2 flex gap-2">
        <button onClick={() => onEdit(reservation)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
        <button onClick={() => onDelete(reservation.reservationId)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </td>
    </tr>
  );

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Reservations</h2>

      <SearchBar
        columns={columns}
        searchColumn={searchColumn}
        setSearchColumn={setSearchColumn}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onSearch={() => setPage(0)}
      />

      <DataTable
        columns={columns.map((c) => c.label)}
        rows={reservations}
        renderRow={renderRow}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(col, dir) => {
          setSortBy(col);
          setSortDirection(dir);
          setPage(0);
        }}
        onEdit={(reservation) => console.log("Edit reservation:", reservation)}
        onDelete={(id) => console.log("Delete reservation with ID:", id)}
      />
    </DashboardLayout>
  );
}








