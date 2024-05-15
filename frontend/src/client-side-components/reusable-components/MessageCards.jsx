import './messageCards.css';

export default function MessageCards({ title, message, onDelete, id }) {
  return (
    <div className="message-card">
      <h3 className="message-title">{title}</h3>
      <p className="message-content">{message}</p>
      <button className="message-delete-button" onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
