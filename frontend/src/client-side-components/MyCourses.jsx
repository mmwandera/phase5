import { useEffect, useState } from 'react';
import dummyData from './dummy-data/home-data.json';
import "./home.css";
import HomeCard from './reusable-components/HomeCard';
import HomeFooter from './reusable-components/HomeFooter';
import HomeHeader from './reusable-components/HomeHeader';
import HomeSearchBar from './reusable-components/HomeSearchBar';

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(dummyData);
  }, []);

  return (
    <div className="home">
      <HomeHeader />
      <main className="home-main">
        <h1 className="home-welcome-message">Welcome, User</h1>
        <div className="home-search-bar-container">
          <HomeSearchBar />
        </div>
        <div className="home-card-container">
          {/* Render cards here */}
          {cards.map((card, index) => (
            <HomeCard
              key={index}
              thumbnail={card.thumbnail}
              description={card.description}
              title={card.title}
              modules={card.modules}
              price={card.price}
            />))}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}

