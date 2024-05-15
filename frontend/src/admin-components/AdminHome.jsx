import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './reusable-components/Card';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';
import SearchBar from './reusable-components/SearchBar';

export default function AdminHome() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/admin-course')
      .then(response => {
        setCourses(response.data.courses);
        console.log(response.data.courses);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div className="admin-home">
      <Header />
      <main className="admin-main">
        <h1 className="welcome-message">Welcome, User</h1>
        <div className="search-bar-container">
          <SearchBar />
        </div>
        <h2 className="courses-heading">My Courses</h2>
        <div className="card-container">
          {courses.map(course => (
            <Card
              key={course.id}
              title={course.title}
              thumbnail={course.thumbnail}
              category={course.category}
              price={course.price}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}