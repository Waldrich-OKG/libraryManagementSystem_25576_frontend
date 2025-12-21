import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";

export default function Users() {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("userId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchColumn, setSearchColumn] = useState("userId");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const baseUrl = "http://localhost:8080/users";
    const endpoint = searchKeyword
      ? `${baseUrl}/search?column=${searchColumn}&keyword=${searchKeyword}&page=${page}&size=10`
      : `${baseUrl}/all?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`;

    axios
      .get(endpoint, { headers: { Authorization: `Bearer ${auth?.accessToken}` } })
      .then((res) => {
        setUsers(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Failed to fetch users", err));
  }, [auth, page, sortBy, sortDirection, searchColumn, searchKeyword]);

  const columns = [
    { value: "userId", label: "User ID" },
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "email", label: "Email" },
    { value: "role", label: "Role" }
  ];

  const renderRow = (user, onEdit, onDelete) => (
    <tr key={user.userId} className="border-b">
      <td className="px-4 py-2">{user.userId}</td>
      <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2 flex gap-2">
        <button onClick={() => onEdit(user)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
        <button onClick={() => onDelete(user.userId)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </td>
    </tr>
  );

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

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
        rows={users}
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
        onEdit={(user) => console.log("Edit user:", user)}
        onDelete={(id) => console.log("Delete user with ID:", id)}
      />
    </DashboardLayout>
  );
}









