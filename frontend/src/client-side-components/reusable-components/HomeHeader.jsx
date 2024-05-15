import { Link } from 'react-router-dom';
import logo from '../../assets/MasomoLMS-white.svg';

export default function HomeHeader() {
  const handleLogout = () => {
    // Remove admin ID from localStorage
    localStorage.removeItem('studentId');

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/my-courses">My Courses</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Help Desk</Link></li>
          <li><Link to="/admin">Teacher&apos;s Portal</Link></li>
        </ul>
      </nav>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
}
