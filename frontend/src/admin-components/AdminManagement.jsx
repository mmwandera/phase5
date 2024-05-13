import { useEffect, useState } from 'react';
import './adminManagement.css';
import dummyData from './dummy-data/adminmgt-data.json';
import AdminCard from './reusable-components/AdminCard';
import AdminSearchBar from './reusable-components/AdminSearchBar';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    setAdmins(dummyData);
  }, []);

  return (
    <div className="admin-management">
      <Header />
      <main className="admin-main">
        <div className="admin-form-container">
          <h2 className="form-heading">Add New Admin</h2>
          <form className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Admin Name</label>
              <input type="text" id="name" name="name" placeholder="Enter Admin Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Admin Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter Admin email address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input type="password" id="password" name="password" placeholder="Enter Admin password" />
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
