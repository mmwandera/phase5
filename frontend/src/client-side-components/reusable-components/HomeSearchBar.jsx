import { useState } from 'react';

export default function HomeSearchBar({ onSearch }) {
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
        placeholder="Search for courses..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-button">Search</button>
    </div>
  );
}