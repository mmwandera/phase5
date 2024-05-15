import { useEffect, useState } from 'react';
import './home.css';
import HomeCard from './reusable-components/HomeCard';
import HomeFooter from './reusable-components/HomeFooter';
import HomeHeader from './reusable-components/HomeHeader';
import HomeSearchBar from './reusable-components/HomeSearchBar';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the /courses route when the component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/courses'); // Updated API endpoint
      const data = await response.json();
      if (response.ok) {
        // Update the state with the fetched courses
        setCourses(data.courses);
      } else {
        console.error('Failed to fetch courses:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <HomeHeader />
      <main className="home-main">
        <h1 className="home-welcome-message">Welcome, User</h1>
        <div className="home-search-bar-container">
          <HomeSearchBar onSearch={handleSearch} />
        </div>
        <div className="home-card-container">
          {filteredCourses.map((course, index) => (
            <HomeCard
              key={index}
              id={course.id} // Pass the course ID to each HomeCard
              thumbnail={course.thumbnail}
              description={course.description}
              title={course.title}
              modules={course.modules} // Pass the count of modules
              price={course.price}
            />
          ))}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}