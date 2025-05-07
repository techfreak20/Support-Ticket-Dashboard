import React from "react";

function TicketList({ tickets, onStatusUpdate }) {
  const handleStatusChange = (ticketId, newStatus) => {
    onStatusUpdate(ticketId, newStatus);
  };

  return (
    <div className="ticket-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td data-label="ID">{ticket.id}</td>
              <td data-label="Title">{ticket.title}</td>
              <td data-label="Customer">{ticket.customer}</td>
              <td data-label="Priority">{ticket.priority}</td>
              <td data-label="Status">
                <select
                  value={status[ticket.id] || ticket.status} // Use local state or fallback to initial status
                  onChange={(e) =>
                    handleStatusChange(ticket.id, e.target.value)
                  }
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
              <td data-label="Actions">
                <button
                  onClick={() => handleStatusChange(ticket.id, "In Progress")}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
