import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";

export default function Borrowings() {
  const { auth } = useContext(AuthContext);
  const [borrowings, setBorrowings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("borrowingId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchColumn, setSearchColumn] = useState("borrowingId");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const baseUrl = "http://localhost:8080/borrowings";
    const endpoint = searchKeyword
      ? `${baseUrl}/search?column=${searchColumn}&keyword=${searchKeyword}&page=${page}&size=10`
      : `${baseUrl}/all?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`;

    axios
      .get(endpoint, { headers: { Authorization: `Bearer ${auth?.accessToken}` } })
      .then((res) => {
        setBorrowings(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Failed to fetch borrowings", err));
  }, [auth, page, sortBy, sortDirection, searchColumn, searchKeyword]);

  const columns = [
    { value: "borrowingId", label: "Borrowing ID" },
    { value: "bookTitle", label: "Book Title" },
    { value: "userEmail", label: "User Email" },
    { value: "status", label: "Status" }
  ];

  const renderRow = (borrowing, onEdit, onDelete) => (
    <tr key={borrowing.borrowingId} className="border-b">
      <td className="px-4 py-2">{borrowing.borrowingId}</td>
      <td className="px-4 py-2">{borrowing.bookTitle}</td>
      <td className="px-4 py-2">{borrowing.userEmail}</td>
      <td className="px-4 py-2">{borrowing.status}</td>
      <td className="px-4 py-2 flex gap-2">
        <button onClick={() => onEdit(borrowing)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
        <button onClick={() => onDelete(borrowing.borrowingId)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </td>
    </tr>
  );

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Borrowings</h2>

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
        rows={borrowings}
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
        onEdit={(borrowing) => console.log("Edit borrowing:", borrowing)}
        onDelete={(id) => console.log("Delete borrowing with ID:", id)}
      />
    </DashboardLayout>
  );
}








