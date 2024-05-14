import './addCourse.css';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AddCourse() {
  return (
    <div className="add-course">
      <Header />
      <main className="add-course-main">
        <h1 className="add-course-heading">Add New Course</h1>
        <form className="course-form">
          <div className="form-group">
            <label htmlFor="courseTitle">Course Title:</label>
            <input type="text" id="courseTitle" name="courseTitle" />
          </div>
          <div className="form-group">
            <label htmlFor="courseThumbnail">Course Thumbnail:</label>
            <input type="type" id="courseThumbnail" name="courseThumbnail" />
          </div>
          <div className="form-group">
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea id="courseDescription" name="courseDescription"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="coursePrice">Course Price:</label>
            <input type="text" id="coursePrice" name="coursePrice" />
          </div>

          {/* Modules Section */}
          <h2 className="module-heading">Modules</h2>
          {/* Repeat the following section 10 times */}
          {[...Array(10)].map((_, index) => (
            <div key={index} className="module-form">
              <h3>Module {index + 1}</h3>
              <div className="form-group">
                <label htmlFor={`moduleTitle${index}`}>Module Title:</label>
                <input type="text" id={`moduleTitle${index}`} name={`moduleTitle${index}`} />
              </div>
              <div className="form-group">
                <label htmlFor={`moduleMedia${index}`}>Module Media:</label>
                <input type="text" id={`moduleMedia${index}`} name={`moduleMedia${index}`} />
              </div>
              <div className="form-group">
                <label htmlFor={`moduleNotes${index}`}>Module Notes:</label>
                <textarea id={`moduleNotes${index}`} name={`moduleNotes${index}`}></textarea>
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