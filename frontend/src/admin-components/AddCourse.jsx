import axios from 'axios';
import { useState } from 'react';
import './addCourse.css'; // Ensure this CSS file includes styles that make the form more appealing
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '',
    modules: Array(10).fill({ title: '', media: '', notes: '' }), // Initialize with 10 empty modules
  });

  // Function to handle input changes for course details
  const handleInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Function to handle changes in module details
  const handleModuleChange = (index, e) => {
    const newModules = [...course.modules];
    newModules[index] = { ...newModules[index], [e.target.name]: e.target.value };
    setCourse({ ...course, modules: newModules });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem('adminId'); // Retrieve the admin ID from local storage

    try {
      await axios.post('http://localhost:5000/add-course', { ...course, admin_id: adminId });
      alert('Course added successfully');
      // Optionally, clear the form or redirect the user to another page
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course');
    }
  };

  return (
    <div className="add-course-page">
      <Header />
      <main className="add-course-main">
        <h1>Add New Course</h1>
        <form onSubmit={handleSubmit} className="course-form">
          {/* Course Details Inputs */}
          <label>
            Course Title:
            <input type="text" name="title" value={course.title} onChange={handleInputChange} />
          </label>
          <label>
            Course Thumbnail URL:
            <input type="text" name="thumbnail" value={course.thumbnail} onChange={handleInputChange} />
          </label>
          <label>
            Course Description:
            <textarea name="description" value={course.description} onChange={handleInputChange}></textarea>
          </label>
          <label>
            Course Price:
            <input type="text" name="price" value={course.price} onChange={handleInputChange} />
          </label>

          {/* Modules Inputs */}
          <h2>Modules</h2>
          {course.modules.map((module, index) => (
            <div key={index} className="module-section">
              <h3>Module {index + 1}</h3>
              <label>
                Module Title:
                <input type="text" name="title" value={module.title} onChange={(e) => handleModuleChange(index, e)} />
              </label>
              <label>
                Module Media URL:
                <input type="text" name="media" value={module.media} onChange={(e) => handleModuleChange(index, e)} />
              </label>
              <label>
                Module Notes:
                <textarea name="notes" value={module.notes} onChange={(e) => handleModuleChange(index, e)}></textarea>
              </label>
            </div>
          ))}

          <button type="submit" className="submit-button">Submit Course</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}