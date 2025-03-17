import { useState } from "react";
import "./AdminEvent.css";

const EventAdminPanel = () => {
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [search, setSearch] = useState("");

  // Dummy Data: Users with multiple event registrations, Txn ID & Date added
  const [participants, setParticipants] = useState([
    { txnId: "TXN001", id: "U001", name: "John Doe", email: "john@example.com", phone: "1234567890", events: ["ARCHIVING EMOTIONS", "Bandish"], date: "2025-03-10", verified: false },
    { txnId: "TXN002", id: "U002", name: "Jane Smith", email: "jane@example.com", phone: "9876543210", events: ["ART-GALLERY", "Boogiethrill", "Quiz"], date: "2025-03-12", verified: false },
    { txnId: "TXN003", id: "U003", name: "Alice Johnson", email: "alice@example.com", phone: "9988776655", events: ["Brush Hour"], date: "2025-03-14", verified: false },
    { txnId: "TXN004", id: "U004", name: "Bob Martin", email: "bob@example.com", phone: "5566778899", events: ["Goonj", "Gracing Gestures", "Quiz"], date: "2025-03-15", verified: true },
    { txnId: "TXN005", id: "U005", name: "Charlie Brown", email: "charlie@example.com", phone: "1122334455", events: ["Graffiti", "Hair Styling"], date: "2025-03-16", verified: false },
    { txnId: "TXN006", id: "U006", name: "David Warner", email: "david@example.com", phone: "6677889900", events: ["Hermosa", "Impressions", "Kite Runner"], date: "2025-03-16", verified: false },
    { txnId: "TXN007", id: "U007", name: "Emma Watson", email: "emma@example.com", phone: "7788990011", events: ["literati", "Lively Facets"], date: "2025-03-17", verified: true },
    { txnId: "TXN008", id: "U008", name: "Michael Scott", email: "michael@example.com", phone: "9900112233", events: ["Mel-Jol", "Photoholic", "Proelium", "Bandish"], date: "2025-03-18", verified: false },
    { txnId: "TXN009", id: "U009", name: "Dwight Schrute", email: "dwight@example.com", phone: "2200334455", events: ["Quiz", "Raga", "Rising Star"], date: "2025-03-19", verified: false },
    { txnId: "TXN00101", id: "U0010", name: "Aditi", email: "aditi@example.com", phone: "1234567890", events: ["ARCHIVING EMOTIONS", "Bandish", "Photoholic"], date: "2025-03-10", verified: false },
    { txnId: "TXN0021", id: "U0021", name: "Vini", email: "jane@example.com", phone: "9876543210", events: ["ART-GALLERY", "Boogiethrill", "Graffiti"], date: "2025-03-12", verified: false },
    { txnId: "TXN0023", id: "U0032", name: "Shrestha", email: "alice@example.com", phone: "9988776655", events: ["Brush Hour", "Photoholic", "Bandish"], date: "2025-03-14", verified: false },
    { txnId: "TXN0034", id: "U0043", name: "Alok", email: "alok@example.com", phone: "5566778899", events: ["Goonj", "Gracing Gestures"], date: "2025-03-15", verified: true },
    { txnId: "TXN0045", id: "U0054", name: "Abhishek", email: "charlie@example.com", phone: "1122334455", events: ["Graffiti", "Hair Styling", "Quiz"], date: "2025-03-16", verified: false },
    { txnId: "TXN0076", id: "U0065", name: "Chandan", email: "david@example.com", phone: "6677889900", events: ["Hermosa", "Impressions", "Kite Runner", "Photoholic"], date: "2025-03-16", verified: false },
    { txnId: "TXN0079", id: "U0077", name: "Vinayak", email: "emma@example.com", phone: "7788990011", events: ["literati", "Lively Facets", "Bandish"], date: "2025-03-17", verified: true },
    { txnId: "TXN0058", id: "U0088", name: "Sher", email: "michael@example.com", phone: "9900112233", events: ["Mel-Jol", "Photoholic", "Proelium"], date: "2025-03-18", verified: false },
    { txnId: "TXN0079", id: "U0099", name: "cheetah", email: "dwight@example.com", phone: "2200334455", events: ["Quiz", "Raga", "Rising Star", "Bandish"], date: "2025-03-19", verified: false }
  ]);

  const eventList = [
    "ARCHIVING EMOTIONS", "ART-GALLERY", "Bandish", "Boogiethrill", "Brush Hour",
    "Glittering Hands", "Goonj", "Gracing Gestures", "Graffiti", "Hair Styling",
    "Hermosa", "Impressions", "Kite Runner", "literati", "Lively Facets",
    "Mel-Jol", "Photoholic", "Proelium", "Quiz", "Raga", "Rising Star"
  ];

  // Toggle verification status
  const toggleVerification = (id) => {
    setParticipants(participants.map(participant =>
      participant.id === id ? { ...participant, verified: !participant.verified } : participant
    ));
  };

  // Apply search filter
  let filteredParticipants = participants.filter(participant =>
    participant.id.includes(search) ||
    participant.name.toLowerCase().includes(search.toLowerCase()) ||
    participant.email.toLowerCase().includes(search.toLowerCase()) ||
    participant.phone.includes(search)
  );

  // Apply event filter
  if (selectedEvent !== "All") {
    filteredParticipants = filteredParticipants.filter(participant =>
      participant.events.includes(selectedEvent)
    );
  }

  return (
    <div className="event-admin-panel">
      <div className="controls">
        <input
          type="text"
          placeholder="Search by Name, User ID, Email, Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="event-dropdown"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="All">All Events</option>
          {eventList.map((event, index) => (
            <option key={index} value={event}>{event}</option>
          ))}
        </select>

        <button className="clear-btn" onClick={() => { setSearch(""); setSelectedEvent("All"); }}>
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
            <th>Date</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.txnId}</td>
              <td>{participant.id}</td>
              <td>{participant.name}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.date}</td>
              <td>
                <button
                  className={`verify-btn ${participant.verified ? "unverify-btn" : ""}`}
                  onClick={() => toggleVerification(participant.id)}
                >
                  {participant.verified ? "❌" : "✅"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventAdminPanel;
