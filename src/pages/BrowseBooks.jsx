// src/pages/BrowseBooks.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import BookCard from "../components/BookCard";
import { AuthContext } from "../context/AuthContext";

export default function BrowseBooks() {
  const { auth } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");



    useEffect(() => {
        const endpoint = searchKeyword
            ? `http://localhost:8080/books/search?keyword=${searchKeyword}&page=${page}&size=12`
            : `http://localhost:8080/books/all?page=${page}&size=12`;

        axios.get(endpoint, {
            headers: { Authorization: `Bearer ${auth?.accessToken}` }
        })
        .then(res => {
            setBooks(res.data.content);
            setTotalPages(res.data.totalPages);
        })
        .catch(err => console.error("Failed to fetch books", err));
    }, [auth, page, searchKeyword]);


  // Borrow handler
  const handleBorrow = (bookId) => {
    axios.post(`http://localhost:8080/borrow/${bookId}`, {}, {
      headers: { Authorization: `Bearer ${auth?.accessToken}` }
    })
    .then(() => alert("Book borrowed successfully!"))
    .catch(err => console.error("Failed to borrow book", err));
  };

  // Reserve handler
  const handleReserve = (bookId) => {
    axios.post(`http://localhost:8080/reserve/${bookId}`, {}, {
      headers: { Authorization: `Bearer ${auth?.accessToken}` }
    })
    .then(() => alert("Book reserved successfully!"))
    .catch(err => console.error("Failed to reserve book", err));
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Browse Books</h2>

        <div className="flex justify-center mb-6">
            <input
                type="text"
                placeholder="Search by title, author, category, language, year, or status..."
                value={searchKeyword}
                onChange={(e) => {
                setPage(0); // reset to first page when searching
                setSearchKeyword(e.target.value);
                }}
                className="w-1/2 px-4 py-2 border rounded"
            />
        </div>


      {Array.isArray(books) && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard
              key={book.bookId}
              book={book}
              onBorrow={handleBorrow}
              onReserve={handleReserve}
            />
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm font-medium">Page {page + 1} of {totalPages}</span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
}








// src/pages/BrowseBooks.jsx
// import React, { useEffect, useState, useContext } from "react";
// import DashboardLayout from "../layouts/DashboardLayout";
// import BookCard from "../components/BookCard";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";


// export default function BrowseBooks() {
//     const { auth } = useContext(AuthContext);
//     const [books, setBooks] = useState([]);
//     const [page, setPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);


//     useEffect(() => {
//         // Fetch books from backend
//         axios.get("http://localhost:8080/books/all", {
//         headers: {
//             Authorization: `Bearer ${auth?.accessToken}`
//         }
//     })
//         .then(res => {
//             console.log("Books response:", res.data);
//             setBooks(res.data.content);
//             setTotalPages(res.data.totalPages);
//         })
//         .catch(err => console.error("Failed to fetch books", err));
//     }, [auth, page]);

//     return (
//         <DashboardLayout>
//             <h2 className="text-2xl font-bold mb-6">Browse Books</h2>

//             {/* Book Grid */}
//             {Array.isArray(books) && books.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {books.map(book => (
//                 <BookCard key={book.bookId} book={book} />
//                 ))}
//             </div>
//             ) : (
//             <p>No books available.</p>
//             )}

//             <div className="flex justify-center items-center mt-8 gap-4">
//                 <button
//                     onClick={() => setPage(prev => Math.max(prev - 1, 0))}
//                     disabled={page === 0}
//                     className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//                 >
//                     Previous
//                 </button>

//                 <span className="text-sm font-medium">Page {page + 1} of {totalPages}</span>

//                 <button
//                     onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
//                     disabled={page >= totalPages - 1}
//                     className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </DashboardLayout>
//     );
// }








// src/pages/BrowseBooks.jsx
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import DashboardLayout from "../layouts/DashboardLayout";

// export default function BrowseBooks() {
//   const { auth } = useContext(AuthContext);

//   return (
//     <DashboardLayout>
//       {auth?.role === "LIBRARIAN" ? (
//         <>
//           <h2 className="text-2xl font-bold mb-4">Manage Books</h2>
//           <p>Admins can add, edit, or remove books here.</p>
//         </>
//       ) : (
//         <>
//           <h2 className="text-2xl font-bold mb-4">Browse Books</h2>
//           <p>List of available books with search and filter options.</p>
//         </>
//       )}
//     </DashboardLayout>
//   );
// }