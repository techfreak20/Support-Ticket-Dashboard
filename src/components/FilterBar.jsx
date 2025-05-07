import React from "react";

function FilterBar({ setFilters }) {
  const handleStatusChange = (event) => {
    setFilters((prev) => ({ ...prev, status: event.target.value }));
  };

  const handlePriorityChange = (event) => {
    setFilters((prev) => ({ ...prev, priority: event.target.value }));
  };

  return (
    <div className="filter-bar">
      <select onChange={handleStatusChange}>
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
      <select onChange={handlePriorityChange}>
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default FilterBar;
