import './Payment.css';
import { useState } from "react";

const AdminPanel = () => {
  const [transactions, setTransactions] = useState([
    { id: "TXN123", userId: "ABH001", name: "John Doe", email: "john@example.com", phone: "1234567890", status: "Pending", date: "2025-03-15", events: ["ARCHIVING EMOTIONS", "ART-GALLERY"] },
    { id: "TXN124", userId: "ABH002", name: "Jane Smith", email: "jane@example.com", phone: "9876543210", status: "Approved", date: "2025-03-14", events: ["Bandish", "Boogiethrill", "Brush Hour"] },
    { id: "TXN125", userId: "ABH003", name: "Alice Johnson", email: "alice@example.com", phone: "9988776655", status: "Pending", date: "2025-03-16", events: ["Glittering Hands"] },
    { id: "TXN126", userId: "ABH004", name: "Bob Martin", email: "martin@example.com", phone: "5566778899", status: "Approved", date: "2025-03-12", events: ["Goonj", "Gracing Gestures"] },
    { id: "TXN127", userId: "ABH005", name: "Charlie Brown", email: "charlie@example.com", phone: "1122334455", status: "Pending", date: "2025-03-17", events: ["Graffiti", "Hair Styling", "Hermosa"] },
    { id: "TXN1231", userId: "ABH001", name: "Alok", email: "alokk@example.com", phone: "1234567890", status: "Pending", date: "2025-03-15", events: ["ARCHIVING EMOTIONS", "ART-GALLERY"] },
    { id: "TXN1242", userId: "ABH002", name: "Aditi", email: "aditi@example.com", phone: "9876543210", status: "Approved", date: "2025-03-14", events: ["Bandish", "Boogiethrill", "Brush Hour"] },
    { id: "TXN1253", userId: "ABH003", name: "Vinayak", email: "alice@example.com", phone: "9988776655", status: "Pending", date: "2025-03-16", events: ["Glittering Hands"] },
    { id: "TXN1264", userId: "ABH004", name: "Abhishek", email: "abhii@example.com", phone: "5566778899", status: "Approved", date: "2025-03-12", events: ["Goonj", "Gracing Gestures"] },
    { id: "TXN1275", userId: "ABH005", name: "Chandan", email: "chandan@example.com", phone: "1122334455", status: "Pending", date: "2025-03-17", events: ["Graffiti", "Hair Styling", "Hermosa"] }
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState(""); // New state for date filtering

  const updateStatus = (id) => {
    setTransactions(transactions.map(txn =>
      txn.id === id ? { ...txn, status: txn.status === "Pending" ? "Approved" : "Pending" } : txn
    ));
  };

  // Apply filters
  let filteredTransactions = transactions.filter(txn =>
    txn.id.includes(search) ||
    txn.userId.includes(search) ||
    txn.email.toLowerCase().includes(search.toLowerCase()) ||
    txn.phone.includes(search) ||
    txn.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filterStatus !== "All") {
    filteredTransactions = filteredTransactions.filter(txn => txn.status === filterStatus);
  }

  if (selectedDate) {
    filteredTransactions = filteredTransactions.filter(txn => txn.date === selectedDate);
  }

  return (
    <div className="admin-panel">
      <div className="controls">
        <button className="filter-btn" onClick={() => setFilterStatus(filterStatus === "All" ? "Pending" : filterStatus === "Pending" ? "Approved" : "All")}>
          {filterStatus === "All" ? "All Status" : filterStatus === "Pending" ? "Pending" : "Approved"}
        </button>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />

        <input
          type="text"
          placeholder="Search by Name, Txn ID, User ID, Email, Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="clear-btn" onClick={() => { setSearch(""); setFilterStatus("All"); setSelectedDate(""); }}>
          Clear All
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Date</th>
            <th>Events</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.userId}</td>
              <td>{txn.name}</td>
              <td>{txn.email}</td>
              <td>{txn.phone}</td>
              <td className={txn.status === "Approved" ? "approved" : "pending"}>{txn.status}</td>
              <td>{txn.date}</td>
              <td className="events-list">{txn.events.join(", ")}</td>
              <td>
                <button
                  className={`toggle-btn ${txn.status === "Pending" ? "approve-btn" : "pending-btn"}`}
                  onClick={() => updateStatus(txn.id)}
                >
                  {txn.status === "Pending" ? "Approve" : "Mark Pending"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
