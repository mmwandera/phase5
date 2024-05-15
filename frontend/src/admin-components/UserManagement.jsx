import { useEffect, useState } from 'react';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';
import UserCard from './reusable-components/UserCard';
import UserSearchBar from './reusable-components/UserSearchBar';
// import './userManagement.css';

export default function UserManagement() {
  const [students, setStudents] = useState([]); // Ensure initial state is an array
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch students
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get-students');
        const data = await response.json();
        if (Array.isArray(data)) {
          setStudents(data); // Ensure data is an array
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSelectStudent = (studentId) => {
    setSelectedStudentId(studentId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredStudents = students.filter(student =>
    student.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-management">
      <Header />
      <main className="admin-main">
        <div className="admin-card-container">
          <h2 className="card-heading">Students</h2>
          <div className="search-bar-container">
            <UserSearchBar onSearch={handleSearch} />
          </div>
          <div className="card-container">
            {filteredStudents.map(student => (
              <UserCard
                key={student.id}
                id={student.id}
                name={student.username}
                email={student.email}
                onSelect={handleSelectStudent}
              />
            ))}
          </div>
        </div>
        {selectedStudentId && <SendMessage studentId={selectedStudentId} />}
      </main>
      <Footer />
    </div>
  );
}