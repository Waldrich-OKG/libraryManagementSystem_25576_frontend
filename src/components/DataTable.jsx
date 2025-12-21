import React from "react";

export default function DataTable({
  columns,
  rows,
  renderRow,
  page,
  totalPages,
  onPageChange,
  sortBy,
  sortDirection,
  onSortChange,
  onEdit,
  onDelete
}) {
  const handleSort = (col) => {
    const newDirection =
      sortBy === col && sortDirection === "asc" ? "desc" : "asc";
    onSortChange(col, newDirection);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                onClick={() => handleSort(col)}
                className="px-4 py-2 text-left border-b cursor-pointer select-none"
              >
                {col}
                {sortBy === col && (
                  <span className="ml-1 text-xs">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
            {Array.isArray(rows) && rows.length > 0 ? (
                rows.map((row) => renderRow(row, onEdit, onDelete))
                ) : (
                <tr>
                    <td colSpan={columns.length + 1} className="px-4 py-2 text-center text-gray-500">
                    No data available.
                    </td>
                </tr>
            )}

        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}








