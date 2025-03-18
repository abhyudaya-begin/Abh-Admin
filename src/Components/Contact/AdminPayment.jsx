// src/components/AdminPanel/index.jsx
import React, { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import FilterControls from "./FilterControls";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import useTransactions from "./useTransactions";

const AdminPanel = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmAction: null
  });
  
  const showConfirmModal = (title, message, onConfirm) => {
    setModalConfig({
      title,
      message,
      confirmAction: onConfirm
    });
    setIsModalOpen(true);
  };

  // Custom hook with modal callback
  const { 
    transactions, 
    displayedTransactions, 
    loading, 
    error, 
    updateTransactionStatus,
    resetFilters 
  } = useTransactions(search, filterStatus, selectedDate);

  const handleClearFilters = () => {
    setSearch("");
    setFilterStatus("All");
    setSelectedDate("");
    resetFilters();
  };

  const handleMarkPaid = (trxnId, ABH_ID) => {
    showConfirmModal(
      "Confirm Payment",
      `Are you sure you want to mark transaction ${trxnId} as paid?`,
      () => {
        updateTransactionStatus(trxnId, ABH_ID);
        setIsModalOpen(false);
      }
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="w-full px-4 py-6 bg-gray-900 text-gray-100">
      <FilterControls
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onClear={handleClearFilters}
      />

      <TransactionTable 
        transactions={displayedTransactions} 
        onMarkPaid={handleMarkPaid} 
      />

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-100 mb-4">{modalConfig.title}</h3>
            <p className="text-gray-300 mb-6">{modalConfig.message}</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                onClick={modalConfig.confirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;