import { useEffect, useState } from 'react';
import './adminManagement.css';
import AdminCard from './reusable-components/AdminCard';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';

export default function AdminManagement() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get-admins');
        if (response.ok) {
          const adminsData = await response.json();
          setAdmins(adminsData);
          console.log(adminsData);
        } else {
          alert('Failed to fetch admins');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch admins');
      }
    };

    fetchAdmins();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/add-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      if (response.ok) {
        const newAdmin = await response.json();
        setAdmins([...admins, newAdmin]);
        // Clear the form fields
        setName('');
        setEmail('');
        setPassword('');
        alert('Admin added successfully');
      } else {
        // Handle error response
        alert('Failed to add admin');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add admin');
    }
  };

  const handleDeleteAdmin = (adminId) => {
    setAdmins(admins.filter(admin => admin.id !== adminId));
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
                <input type="text" id="name" name="name" placeholder="Enter Admin Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Admin Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter Admin email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Admin Password</label>
                <input type="password" id="password" name="password" placeholder="Enter Admin password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="form-submit-button">Add Admin</button>
            </form>

        </div>
        <div className="admin-card-container">
          <h2 className="card-heading">Admins</h2>

          <div className="card-container">
            {admins.map(admin => (
              <AdminCard
                key={admin.id}
                id={admin.id}
                name={admin.name}
                email={admin.email}
                onDelete={handleDeleteAdmin}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}