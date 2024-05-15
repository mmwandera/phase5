import { Link, useNavigate } from 'react-router-dom';
import whiteLogo from '../../assets/MasomoLMS-white.svg';
import './header.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and student ID from local storage
    // localStorage.removeItem('token');
    localStorage.removeItem('studentId'); // Ensure this matches the key used in Login.jsx
    // Redirect user to login page
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={whiteLogo} alt="MasomoLMS Logo" className="logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/user-management">User Management</Link></li>
          <li><Link to="/dashboard/admin-management">Admin Management</Link></li>
          <li><Link to="/dashboard/add-course">Add Course</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
}