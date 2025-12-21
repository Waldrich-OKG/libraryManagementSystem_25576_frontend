import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";

export default function Fines() {
  const { auth } = useContext(AuthContext);
  const [fines, setFines] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("fineId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchColumn, setSearchColumn] = useState("fineId");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const baseUrl = "http://localhost:8080/fines";
    const endpoint = searchKeyword
      ? `${baseUrl}/search?column=${searchColumn}&keyword=${encodeURIComponent(searchKeyword)}&page=${page}&size=10`
      : `${baseUrl}/${auth?.role === "LIBRARIAN" || auth?.role === "ADMIN" ? "all" : "user"}?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`;

    axios
      .get(endpoint, { headers: { Authorization: `Bearer ${auth?.accessToken}` } })
      .then((res) => {
        const data = res?.data;
        setFines(Array.isArray(data?.content) ? data.content : []);
        setTotalPages(Number.isFinite(data?.totalPages) ? data.totalPages : 0);
      })
      .catch((err) => console.error("Failed to fetch fines", err));
  }, [auth, page, sortBy, sortDirection, searchColumn, searchKeyword]);

  // SearchBar column definitions (value = backend column name, label = UI text)
  const searchColumns = [
    { value: "fineId", label: "Fine ID" },
    { value: "amount", label: "Amount" },
    { value: "userEmail", label: "User Email" },
    { value: "status", label: "Status" }
  ];

  // Table headers shown in DataTable
  const tableHeaders = ["Fine ID", "Amount", "User Email", "Status", "Actions"];

  const renderRow = (fine, onEdit, onDelete) => (
    <tr key={fine.fineId} className="border-b">
      <td className="px-4 py-2">{fine.fineId}</td>
      <td className="px-4 py-2">{fine.amount}</td>
      <td className="px-4 py-2">{fine.userEmail || "—"}</td>
      <td className="px-4 py-2">{fine.status}</td>
      <td className="px-4 py-2 flex gap-2">
        <button
          onClick={() => onEdit(fine)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(fine.fineId)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Fines</h2>

      <SearchBar
        columns={searchColumns}
        searchColumn={searchColumn}
        setSearchColumn={setSearchColumn}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onSearch={() => setPage(0)}
      />

      <DataTable
        columns={tableHeaders}
        rows={Array.isArray(fines) ? fines : []}
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
        onEdit={(fine) => console.log("Edit fine:", fine)}
        onDelete={(id) => console.log("Delete fine with ID:", id)}
      />
    </DashboardLayout>
  );
}









// src/pages/Fines.jsx
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import DashboardLayout from "../layouts/DashboardLayout";
// import DataTable from "../components/DataTable";
// import { AuthContext } from "../context/AuthContext";

// export default function Fines() {
//   const { auth } = useContext(AuthContext);
//   const [fines, setFines] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [sortBy, setSortBy] = useState("fineId");
//   const [sortDirection, setSortDirection] = useState("asc");

//   useEffect(() => {
//     const endpoint =
//       auth?.role === "LIBRARIAN" || auth?.role === "ADMIN"
//         ? `http://localhost:8080/fines/all?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`
//         : `http://localhost:8080/fines/user?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`;

//     axios.get(endpoint, {
//       headers: { Authorization: `Bearer ${auth?.accessToken}` }
//     })
//     .then(res => {
//         console.log("Fines: ", res.data);
//         setFines(res.data.content);
//         setTotalPages(res.data.totalPages);
//     })
//     .catch(err => console.error("Failed to fetch fines", err));
//   }, [auth, page, sortBy, sortDirection]);

//   const columns = ["Fine ID", "Amount", "Borrowing ID", "User", "Date Issued", "Status"];

//   const renderRow = (fine, onEdit, onDelete) => (
//     <tr key={fine.fineId} className="border-b">
//       <td className="px-4 py-2">{fine.fineId}</td>
//       <td className="px-4 py-2">{fine.amount}</td>
//       <td className="px-4 py-2">{fine.borrowingId}</td>
//       <td className="px-4 py-2">{fine.userEmail || "—"}</td>
//       <td className="px-4 py-2">{fine.issueDate}</td>
//       <td className="px-4 py-2">{fine.fineStatus}</td>
//       <td className="px-4 py-2 flex gap-2">
//         <button onClick={() => onEdit(fine)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
//         <button onClick={() => onDelete(fine.fineId)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
//       </td>
//     </tr>
//   );

//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold mb-6">Fines</h2>
//       <DataTable
//         columns={columns}
//         rows={fines}
//         renderRow={renderRow}
//         page={page}
//         totalPages={totalPages}
//         onPageChange={setPage}
//         sortBy={sortBy}
//         sortDirection={sortDirection}
//         onSortChange={(col, dir) => { setSortBy(col); setSortDirection(dir); setPage(0); }}
//         onEdit={(fine) => console.log("Edit fine:", fine)}
//         onDelete={(id) => console.log("Delete fine with ID:", id)}
//       />
//     </DashboardLayout>
//   );
// }








// src/pages/Fines.jsx
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import DashboardLayout from "../layouts/DashboardLayout";
// import DataTable from "../components/DataTable";
// import { AuthContext } from "../context/AuthContext";

// export default function Fines() {
//   const { auth } = useContext(AuthContext);
//   const [fines, setFines] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [sortBy, setSortBy] = useState("fineId");
//   const [sortDirection, setSortDirection] = useState("asc");

//   useEffect(() => {
//     const endpoint =
//       auth?.role === "LIBRARIAN" || auth?.role === "ADMIN"
//         ? `http://localhost:8080/fines/all?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`
//         : `http://localhost:8080/fines/user?page=${page}&size=10&sortBy=${sortBy}&direction=${sortDirection}`;

//     axios
//       .get(endpoint, {
//         headers: { Authorization: `Bearer ${auth?.accessToken}` }
//       })
//       .then((res) => {
//         setFines(res.data.content);
//         setTotalPages(res.data.totalPages);
//       })
//       .catch((err) => console.error("Failed to fetch fines", err));
//   }, [auth, page, sortBy, sortDirection]);

//   const columns = ["Fine ID", "Amount", "Reason", "Borrowing ID", "User", "Date Issued", "Status"];

//   const renderRow = (fine) => (
//     <tr key={fine.fineId} className="border-b">
//       <td className="px-4 py-2">{fine.fineId}</td>
//       <td className="px-4 py-2">{fine.amount}</td>
//       <td className="px-4 py-2">{fine.reason}</td>
//       <td className="px-4 py-2">{fine.borrowingId}</td>
//       <td className="px-4 py-2">{fine.user?.email || "—"}</td>
//       <td className="px-4 py-2">{fine.dateIssued}</td>
//       <td className="px-4 py-2">{fine.status}</td>
//     </tr>
//   );

//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold mb-6">Fines</h2>
//       <DataTable
//         columns={columns}
//         rows={fines}
//         renderRow={renderRow}
//         page={page}
//         totalPages={totalPages}
//         onPageChange={setPage}
//         sortBy={sortBy}
//         sortDirection={sortDirection}
//         onSortChange={(col, dir) => {
//           setSortBy(col);
//           setSortDirection(dir);
//           setPage(0); // reset to first page when sorting changes
//         }}
//       />
//     </DashboardLayout>
//   );
// }








// src/pages/Fines.jsx
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import DashboardLayout from "../layouts/DashboardLayout";
// import DataTable from "../components/DataTable";
// import { AuthContext } from "../context/AuthContext";

// export default function Fines() {
//   const { auth } = useContext(AuthContext);
//   const [fines, setFines] = useState([]);

//   useEffect(() => {
//     const endpoint = auth?.role === "LIBRARIAN" || auth?.role === "ADMIN"
//       ? "http://localhost:8080/fines/all"
//       : `http://localhost:8080/fines/user`;

//     axios.get(endpoint, {
//       headers: { Authorization: `Bearer ${auth?.accessToken}` }
//     })
//     .then(res => setFines(res.data))
//     .catch(err => console.error("Failed to fetch fines", err));
//   }, [auth]);

//   const columns = ["Fine ID", "Amount", "Reason", "Borrowing ID", "User", "Date Issued", "Status"];

//   const renderRow = (fine) => (
//     <tr key={fine.fineId} className="border-b">
//       <td className="px-4 py-2">{fine.fineId}</td>
//       <td className="px-4 py-2">{fine.amount}</td>
//       <td className="px-4 py-2">{fine.reason}</td>
//       <td className="px-4 py-2">{fine.borrowingId}</td>
//       <td className="px-4 py-2">{fine.user?.email || "—"}</td>
//       <td className="px-4 py-2">{fine.dateIssued}</td>
//       <td className="px-4 py-2">{fine.status}</td>
//     </tr>
//   );

//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold mb-6">Fines</h2>
//       <DataTable columns={columns} rows={fines} renderRow={renderRow} />
//     </DashboardLayout>
//   );
// }