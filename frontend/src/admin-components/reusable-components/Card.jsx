// Card.jsx
import './card.css';

export default function Card({ title, thumbnail, category, price }) {
  return (
    <div className="card">
      <div className="card-thumbnail">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <div>
          <span className="chip">{category}</span>
        </div>
        <p className="card-price">${price}</p>
      </div>
      <div className="card-buttons">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
}
