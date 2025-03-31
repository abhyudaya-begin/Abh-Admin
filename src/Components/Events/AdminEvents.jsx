import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminEvent.css";

const EventAdminPanel = () => {
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}admin/users-events`);
        const users = response.data.users; // Ensure you correctly access the 'users' array
        console.log(users); // Debugging: Check the structure
  
        // ✅ Declare extractedEvents before using it
        const extractedEvents = new Set();
  
        users.forEach(user => {
          if (user.eventsPaid) {
            Object.values(user.eventsPaid).forEach(eventArray => {
              if (Array.isArray(eventArray)) { // Ensure it's an array before iterating
                eventArray.forEach(event => {
                  extractedEvents.add(event.name);
                });
              }
            });
          }
        });
  
        setEventList(["All", ...Array.from(extractedEvents)]);
        setParticipants(users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        console.log(err);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  // Toggle verification status
  const toggleVerification = (id) => {
    setParticipants(participants.map(participant =>
      participant.id === id ? { ...participant, verified: !participant.verified } : participant
    ));
  };

  // Apply search filter
  let filteredParticipants = participants.filter(participant =>
    (participant.id && participant.id.includes(search)) ||
    (participant.name && participant.name.toLowerCase().includes(search.toLowerCase())) ||
    (participant.email && participant.email.toLowerCase().includes(search.toLowerCase())) ||
    (participant.phone && participant.phone.includes(search))
  );
  

  // Apply event filter
  if (selectedEvent !== "All") {
    filteredParticipants = filteredParticipants.filter(participant =>
      participant.eventsPaid && Object.values(participant.eventsPaid).some(eventArray =>
        eventArray.some(event => event.name === selectedEvent)
      )
    );
  }

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="error">{error}</p>;

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
            {/* <th>Txn ID</th> */}
            <th>ABH ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {/* <th>Date</th>
            <th>Verify</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.ABH_ID}>
              <td>{participant.ABH_ID}</td>
              <td>{participant.fullName}</td>
              <td>{participant.email}</td>
              <td>{participant.phoneNumber}</td>
            
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventAdminPanel;
