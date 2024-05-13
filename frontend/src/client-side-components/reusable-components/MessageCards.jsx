import './messageCards.css';

export default function MessageCards({ title, message }) {
  return (
    <div className="message-card">
      <h3 className="message-title">{title}</h3>
      <p className="message-content">{message}</p>
      <button className="message-delete-button">Delete</button>
    </div>
  );
}
