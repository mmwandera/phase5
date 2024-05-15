import './homeCard.css';

export default function HomeCard({ id, thumbnail, title, modules, price, description }) {

  const handleCardClick = async () => {
    const studentId = localStorage.getItem('studentId'); // Get the student ID from local storage

    try {
      const response = await fetch('http://127.0.0.1:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id: id, student_id: studentId }),
      });

      const session = await response.json();

      if (response.ok) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        console.error('Failed to create checkout session:', session.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
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