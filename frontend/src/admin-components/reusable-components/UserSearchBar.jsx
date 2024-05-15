import { useState } from 'react';
import './searchBar.css';

export default function UserSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for users..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">Search</button>
    </div>
  );
}