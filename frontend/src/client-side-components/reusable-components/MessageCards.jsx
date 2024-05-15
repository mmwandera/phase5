import './messageCards.css';

export default function MessageCards({ id, title, message, onDelete }) {
  const handleDelete = async () => {
    const response = await fetch(`http://127.0.0.1:5000/delete-message/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      onDelete(id); // Call the onDelete function passed from the parent component
    } else {
      alert('Failed to delete message');
    }
  };

  return (
    <div className="message-card">
      <h3 className="message-title">{title}</h3>
      <p className="message-content">{message}</p>
      <button className="message-delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );
}