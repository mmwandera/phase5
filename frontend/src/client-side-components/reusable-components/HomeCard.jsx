import { useNavigate } from 'react-router-dom';
import './homeCard.css';

export default function HomeCard({ id, thumbnail, title, modules, price, description }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/checkout/${id}`);
  };

  return (
    <div className="home-card" onClick={handleCardClick}>
      <img src={thumbnail} alt={title} className="home-card-thumbnail" />
      <div className="home-card-details">
        <h3 className="home-card-title">{title}</h3>
        <p className='home-card-description'>{description}</p>
        <p className="home-card-info">
          <span className="home-card-modules">{modules} Modules</span>
          <span className="home-card-price">${price}</span>
        </p>
      </div>
    </div>
  );
}
