import { useEffect, useState } from 'react';
import './adminManagement.css';
import AdminCard from './reusable-components/AdminCard';
import AdminSearchBar from './reusable-components/AdminSearchBar';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch initial list of admins
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/admins');
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.admins);
        setError('');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Error fetching admins. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/add-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Refresh list of admins
        fetchAdmins();
        // Clear form data
        setFormData({ name: '', email: '', password: '' });
        setError('');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      setError('Error adding admin. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-management">
      <Header />
      <main className="admin-main">
        {error && <p className="error">{error}</p>}
        <div className="admin-form-container">
          <h2 className="form-heading">Add New Admin</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Admin Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Admin Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Admin Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Admin email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Admin password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="form-submit-button">Add Admin</button>
          </form>
        </div>
        <div className="admin-card-container">
          <h2 className="card-heading">Admins</h2>
          <div className="search-bar-container">
            <AdminSearchBar />
          </div>
          <div className="card-container">
            {admins.map(admin => (
              <AdminCard
                key={admin.id}
                name={admin.name}
                email={admin.email}
                password={admin.password}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
