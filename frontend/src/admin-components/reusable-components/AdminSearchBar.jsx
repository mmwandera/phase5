import './adminSearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for admins..." />
      <button type="submit" className="search-button">Search</button>
    </div>
  );
}
