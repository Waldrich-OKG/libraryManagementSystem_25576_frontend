import React from "react";

export default function BookCard({ book, onBorrow, onReserve }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
      <img
        src={book.imagePath || "/placeholder-book.png"}
        alt={book.title}
        className="w-full h-48 object-cover"
      />

      {/* Book Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

        <div className="text-sm text-gray-500 space-y-1 mb-3">
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Year:</strong> {book.yearOfPublication}</p>
          <p><strong>Status:</strong> {book.bookStatus}</p>
        </div>

        {/* Action Buttons */}
        {book.bookStatus === "AVAILABLE" ? (
          <button
            onClick={() => onBorrow(book.bookId)}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Borrow
          </button>
        ) : (
          <button
            onClick={() => onReserve(book.bookId)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reserve
          </button>
        )}
      </div>
    </div>
  );
}