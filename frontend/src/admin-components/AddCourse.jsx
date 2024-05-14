import { useState } from 'react';
import './addCourse.css';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AddCourse() {
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseThumbnail: '',
    courseDescription: '',
    coursePrice: '',
    modules: [
      { moduleTitle: '', moduleThumbnail: '', moduleNotes: '' },
      { moduleTitle: '', moduleThumbnail: '', moduleNotes: '' },
      // Add more modules as needed
    ]
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('module')) {
      const modules = [...formData.modules];
      modules[index][name] = value;
      setFormData({ ...formData, modules });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/courses/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwttoken': localStorage.getItem('token') // Assuming you're storing JWT token in localStorage
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data); // Handle success or error response from the server
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-course">
      <Header />
      <main className="add-course-main">
        <h1 className="add-course-heading">Add New Course</h1>
        <form className="course-form" onSubmit={handleSubmit}>
          {/* Course details */}
          <div className="form-group">
            <label htmlFor="courseTitle">Course Title:</label>
            <input type="text" id="courseTitle" name="courseTitle" value={formData.courseTitle} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="courseThumbnail">Course Thumbnail:</label>
            <input type="text" id="courseThumbnail" name="courseThumbnail" value={formData.courseThumbnail} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea id="courseDescription" name="courseDescription" value={formData.courseDescription} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="coursePrice">Course Price:</label>
            <input type="text" id="coursePrice" name="coursePrice" value={formData.coursePrice} onChange={handleChange} />
          </div>

          {/* Modules Section */}
          <h2 className="module-heading">Modules</h2>
          {formData.modules.map((module, index) => (
            <div className="module-form" key={index}>
              <h3>Module</h3>
              <div className="form-group">
                <label htmlFor={`moduleTitle${index}`}>Module Title:</label>
                <input type="text" id={`moduleTitle${index}`} name={`moduleTitle`} value={module.moduleTitle} onChange={(e) => handleChange(e, index)} />
              </div>
              <div className="form-group">
                <label htmlFor={`moduleThumbnail${index}`}>Module Thumbnail:</label>
                <input type="text" id={`moduleThumbnail${index}`} name={`moduleThumbnail`} value={module.moduleThumbnail} onChange={(e) => handleChange(e, index)} />
              </div>
              <div className="form-group">
                <label htmlFor={`moduleNotes${index}`}>Module Notes:</label>
                <textarea id={`moduleNotes${index}`} name={`moduleNotes`} value={module.moduleNotes} onChange={(e) => handleChange(e, index)}></textarea>
              </div>
            </div>
          ))}

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
