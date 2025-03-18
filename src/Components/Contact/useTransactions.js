// src/components/AdminPanel/useTransactions.js
import { useState, useEffect } from "react";
import axios from "axios";

const useTransactions = (search, filterStatus, selectedDate) => {
  const [transactions, setTransactions] = useState([]);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${import.meta.env.VITE_BACKEND_API_URL}admin/transactions`;
        console.log("Fetching from URL:", url);

        const response = await axios.get(url, {
          withCredentials: true
        });
    
        if (isMounted) {
          if (response.data && Array.isArray(response.data.data.transactions)) {
            setTransactions(response.data.data.transactions);
            setDisplayedTransactions(response.data.data.transactions);
          } else {
            console.warn("Invalid response structure:", response.data);
            setTransactions([]);
            setDisplayedTransactions([]);
          }
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        if (isMounted) {
          setError("Failed to load transactions");
          setTransactions([]);
          setDisplayedTransactions([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter transactions based on search, status, and date
  useEffect(() => {
    if (search || filterStatus !== "All" || selectedDate) {
      let filteredData = transactions.filter(
        (txn) =>
          txn.trxnId?.toLowerCase().includes(search.toLowerCase()) ||
          txn.ABH_ID?.toLowerCase().includes(search.toLowerCase()) ||
          txn.email?.toLowerCase().includes(search.toLowerCase()) ||
          txn.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          (txn.events && txn.events.some(event => 
            event.name?.toLowerCase().includes(search.toLowerCase())
          ))
      );

      if (filterStatus !== "All") {
        filteredData = filteredData.filter((txn) => txn.status === filterStatus);
      }

      if (selectedDate) {
        filteredData = filteredData.filter((txn) => txn.date === selectedDate);
      }

      setDisplayedTransactions(filteredData);
    } else {
      setDisplayedTransactions(transactions);
    }
  }, [search, filterStatus, selectedDate, transactions]);

  const updateTransactionStatus = async (trxnId, ABH_ID) => {
    try {
      // Call API to update transaction status
      console.log(ABH_ID, trxnId)
      const url = `${import.meta.env.VITE_BACKEND_API_URL}admin/payment`;
      await axios.post(url, { trxnId, ABH_ID }, {
        withCredentials: true
      });

      // Update local state
      const updatedTransactions = transactions.map((txn) =>
        txn.trxnId === trxnId ? { ...txn, status: "Paid" } : txn
      );
      
      setTransactions(updatedTransactions);
      
      // Also update displayed transactions
      setDisplayedTransactions(
        displayedTransactions.map((txn) =>
          txn.trxnId === trxnId ? { ...txn, status: "Paid" } : txn
        )
      );
    } catch (err) {
      console.error("Error updating transaction status:", err);
      setError("Failed to update transaction status");
    }
  };

  const resetFilters = () => {
    setDisplayedTransactions(transactions);
  };

  return {
    transactions,
    displayedTransactions,
    loading,
    error,
    updateTransactionStatus,
    resetFilters
  };
};

export default useTransactions;