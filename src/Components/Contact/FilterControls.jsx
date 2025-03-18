// src/components/AdminPanel/FilterControls.jsx
import React from 'react';

const FilterControls = ({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  selectedDate,
  setSelectedDate,
  onClear
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <button
          className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors
            ${
              filterStatus === "All"
                ? "bg-gray-700 border-gray-600 text-gray-200"
                : filterStatus === "Pending"
                ? "bg-yellow-900 border-yellow-800 text-yellow-200"
                : "bg-green-900 border-green-800 text-green-200"
            }`}
          onClick={() =>
            setFilterStatus(
              filterStatus === "All"
                ? "Pending"
                : filterStatus === "Pending"
                ? "Paid"
                : "All"
            )
          }
        >
          {filterStatus === "All" ? "All Status" : `Status: ${filterStatus}`}
        </button>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search by Name, ID, Email, Phone, Event"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
        />

        <button
          className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors text-sm"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterControls;