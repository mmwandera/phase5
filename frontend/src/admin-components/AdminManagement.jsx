import { useState } from 'react';
import './adminManagement.css';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AdminManagement() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          user_type: 'admin',
          // You can include additional data like admin name if needed
        })
      });
      if (response.ok) {
        // Handle success - clear the form or show a success message
        console.log('Admin added successfully');
        setFormData({
          name: '',
          email: '',
          password: ''
        });
      } else {
        // Handle error - display an error message or perform other actions
        console.error('Failed to add admin');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-management">
      <Header />
      <main className="admin-main">
        <div className="admin-form-container">
          <h2 className="form-heading">Add New Admin</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Admin Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Admin Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Admin Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Admin email address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Admin password" />
            </div>
            <button type="submit" className="form-submit-button">Add Admin</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
