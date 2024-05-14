import './homeCard.css';

export default function HomeCard({ id, thumbnail, title, modules, price, description }) {

  return (
    <div className="home-card">
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
