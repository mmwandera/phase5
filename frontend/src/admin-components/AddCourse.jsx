import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './addCourse.css'; // Ensure this CSS file includes styles that make the form more appealing
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '',
    modules: [], // Initialize with an empty array for modules
  });

  const handleInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, value, name) => {
    const newModules = [...course.modules];
    newModules[index] = { ...newModules[index], [name]: value };
    setCourse({ ...course, modules: newModules });
  };

  const addModule = () => {
    setCourse({
      ...course,
      modules: [...course.modules, { title: '', media: '', notes: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming admin_id is stored in localStorage or obtained from the current session
    const adminId = localStorage.getItem('adminId'); // Ensure you have the admin ID stored

    try {
      await axios.post('http://localhost:5000/add-course', { ...course, admin_id: adminId });
      alert('Course added successfully');
      // Reset course state or redirect as needed
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
          <h2>Modules</h2>
          {course.modules.map((module, index) => (
            <div key={index} className="module-section">
              <label>
                Module Title:
                <input type="text" name="title" value={module.title} onChange={(e) => handleModuleChange(index, e.target.value, 'title')} />
              </label>
              <label>
                Module Media URL:
                <input type="text" name="media" value={module.media} onChange={(e) => handleModuleChange(index, e.target.value, 'media')} />
              </label>
              <label>
                Module Notes:
                <ReactQuill
                  value={module.notes}
                  onChange={(value) => handleModuleChange(index, value, 'notes')}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addModule} className="add-module-button">Add Module</button>
          <button type="submit" className="submit-button">Submit Course</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}