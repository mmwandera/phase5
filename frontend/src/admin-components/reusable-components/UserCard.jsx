import { Link } from 'react-router-dom';
import './adminCard.css';

export default function UserCard({ id, name, email, onSelect }) {
  return (
    <div className="admin-card" onClick={() => onSelect(id)}>
      <div className="admin-details-container">
        <h3 className="admin-name">{name}</h3>
        <p className="admin-email">{email}</p>
      </div>
      <div className="admin-buttons-container">
        <Link className="admin-edit-button" to={`/user-management/send-message/${id}`}>
          Send Message
        </Link>
      </div>
    </div>
  );
}