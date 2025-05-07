import React from "react";

function SearchBar({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or customer..."
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;
