import './adminCard.css';

export default function AdminCard({ name, email }) {
  return (
    <div className="admin-card">
      <div className="admin-details-container">
        <h3 className="admin-name">{name}</h3>
        <p className="admin-email">{email}</p>
      </div>
      <div className="admin-buttons-container">
        <button className="admin-delete-button">Delete</button>
      </div>
    </div>
  );
}
