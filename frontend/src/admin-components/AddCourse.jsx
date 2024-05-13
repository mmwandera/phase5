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
            <input type="text" id="courseThumbnail" name="courseThumbnail" />
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
            <div className="module-form">
              <h3>Module</h3>
              <div className="form-group">
                <label htmlFor="moduleTitle">Module Title:</label>
                <input type="text" id="moduleTitle" name="moduleTitle" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleThumbnail" >Module Thumbnail:</label>
                <input type="text" id="moduleThumbnail" name="moduleThumbnail" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleNotes" >Module Notes:</label>
                <textarea id="moduleNotes" name="moduleNotes" ></textarea>
              </div>
            </div>
            <div className="module-form">
              <h3>Module</h3>
              <div className="form-group">
                <label htmlFor="moduleTitle">Module Title:</label>
                <input type="text" id="moduleTitle" name="moduleTitle" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleThumbnail" >Module Thumbnail:</label>
                <input type="text" id="moduleThumbnail" name="moduleThumbnail" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleNotes" >Module Notes:</label>
                <textarea id="moduleNotes" name="moduleNotes" ></textarea>
              </div>
            </div>
            <div className="module-form">
              <h3>Module</h3>
              <div className="form-group">
                <label htmlFor="moduleTitle">Module Title:</label>
                <input type="text" id="moduleTitle" name="moduleTitle" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleThumbnail" >Module Thumbnail:</label>
                <input type="text" id="moduleThumbnail" name="moduleThumbnail" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleNotes" >Module Notes:</label>
                <textarea id="moduleNotes" name="moduleNotes" ></textarea>
              </div>
            </div>
            <div className="module-form">
              <h3>Module</h3>
              <div className="form-group">
                <label htmlFor="moduleTitle">Module Title:</label>
                <input type="text" id="moduleTitle" name="moduleTitle" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleThumbnail" >Module Thumbnail:</label>
                <input type="text" id="moduleThumbnail" name="moduleThumbnail" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleNotes" >Module Notes:</label>
                <textarea id="moduleNotes" name="moduleNotes" ></textarea>
              </div>
            </div>
            <div className="module-form">
              <h3>Module</h3>
              <div className="form-group">
                <label htmlFor="moduleTitle">Module Title:</label>
                <input type="text" id="moduleTitle" name="moduleTitle" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleThumbnail" >Module Thumbnail:</label>
                <input type="text" id="moduleThumbnail" name="moduleThumbnail" />
              </div>
              <div className="form-group">
                <label htmlFor="moduleNotes" >Module Notes:</label>
                <textarea id="moduleNotes" name="moduleNotes" ></textarea>
              </div>
            </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
