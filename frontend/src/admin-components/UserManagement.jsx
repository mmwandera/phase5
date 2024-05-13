import { useEffect, useState } from 'react';
import dummyData from './dummy-data/adminmgt-data.json';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';
import UserCard from './reusable-components/UserCard';
import UserSearchBar from './reusable-components/UserSearchBar';

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    setAdmins(dummyData);
  }, []);

  return (
    <div className="admin-management">
      <Header />
      <main className="admin-main">
        <div className="admin-card-container">
          <h2 className="card-heading">Users</h2>
          <div className="search-bar-container">
            <UserSearchBar />
          </div>
          <div className="card-container">
            {admins.map(admin => (
              <UserCard
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
