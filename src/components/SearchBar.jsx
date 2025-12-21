import React from "react";

export default function SearchBar({ columns, searchColumn, setSearchColumn, searchKeyword, setSearchKeyword, onSearch }) {
  return (
    <div className="flex justify-center mb-6 gap-2">
      <select
        value={searchColumn}
        onChange={(e) => setSearchColumn(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        {columns.map((col) => (
          <option key={col.value} value={col.value}>{col.label}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder={`Search by ${searchColumn}...`}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="w-1/3 px-4 py-2 border rounded"
      />

      <button
        onClick={onSearch}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
}