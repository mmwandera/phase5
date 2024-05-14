import './adminCard.css';

export default function AdminCard({ id, name, email, onDelete }) {
  const handleDelete = async () => {
    const response = await fetch(`http://127.0.0.1:5000/delete-admin/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      onDelete(id); // Call the onDelete function passed from the parent component
    } else {
      alert('Failed to delete admin');
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-details-container">
        <h3 className="admin-name">{name}</h3>
        <p className="admin-email">{email}</p>
      </div>
      <div className="admin-buttons-container">
        <button className="admin-delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}