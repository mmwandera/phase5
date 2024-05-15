import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './courseView.css';
import CourseModule from './reusable-components/CourseModule';
import ModuleDetails from './reusable-components/ModuleDetails';

export default function CourseView() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/course/${courseId}`);
        const data = await response.json();

        if (response.ok) {
          setCourseData(data);
          setSelectedModule(data.modules[0]); // Select the first module by default
        } else {
          console.error('Failed to fetch course data:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-view">
      <div className="course-title">
        <h1>{courseData.title}</h1>
      </div>
      <div className="course-content">
        <div className="course-modules">
          <h2>Modules</h2>
          {courseData.modules.map((module, index) => (
            <div key={index} onClick={() => setSelectedModule(module)}>
              <CourseModule title={module.title} />
            </div>
          ))}
        </div>
        <div className="course-media">
          {selectedModule && (
            <ModuleDetails
              id={selectedModule.id}
              title={selectedModule.title}
              media={selectedModule.media}
              notes={selectedModule.notes}
            />
          )}
        </div>
      </div>
    </div>
  );
}