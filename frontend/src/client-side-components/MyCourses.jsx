import { useEffect, useState } from 'react';
import "./home.css";
import HomeCard from './reusable-components/HomeCard';
import HomeFooter from './reusable-components/HomeFooter';
import HomeHeader from './reusable-components/HomeHeader';
import HomeSearchBar from './reusable-components/HomeSearchBar';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const studentId = localStorage.getItem('studentId'); // Get the student ID from local storage

      try {
        const response = await fetch(`http://127.0.0.1:5000/student-courses/${studentId}`);
        const data = await response.json();

        if (response.ok) {
          setCourses(data.courses);
        } else {
          console.error('Failed to fetch courses:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="home">
      <HomeHeader />
      <main className="home-main">
        <h1 className="home-welcome-message">My Courses</h1>
        <div className="home-search-bar-container">
          <HomeSearchBar />
        </div>
        <div className="home-card-container">
          {/* Render courses here */}
          {courses.map((course, index) => (
            <HomeCard
              key={index}
              id={course.id}
              thumbnail={course.thumbnail}
              description={course.description}
              title={course.title}
              modules={course.modules}
              price={course.price}
            />
          ))}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}