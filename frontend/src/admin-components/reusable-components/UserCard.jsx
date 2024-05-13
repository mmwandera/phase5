import { Link } from 'react-router-dom';
import './adminCard.css';

export default function UserCard({ name, email }) {
  return (
    <div className="admin-card">
      <div className="admin-details-container">
        <h3 className="admin-name">{name}</h3>
        <p className="admin-email">{email}</p>
      </div>
      <div className="admin-buttons-container">
        <Link to="/user-management/send-message" className="admin-edit-button">Send Message</Link>
      </div>
    </div>
  );
}
