import { useEffect, useState } from 'react';
import messageData from './dummy-data/message-data.json';
import './profile.css';
import HomeFooter from './reusable-components/HomeFooter';
import HomeHeader from './reusable-components/HomeHeader';
import MessageCards from './reusable-components/MessageCards';

export default function Profile() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messageData);
  }, []);

  return (
    <div className="profile">
      <HomeHeader />
      <main className="profile-main">
        <h1 className="profile-heading">Profile</h1>
        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="password">Change Password</label>
            <input type="password" id="password" name="password" placeholder="Enter new password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" />
          </div>
          <button type="submit" className="confirm-button">Confirm Changes</button>
        </form>
        <div className="messages">
          <h2 className="messages-heading">Messages</h2>
            {messages.map(message => (
              <MessageCards
                key={message.id}
                title={message.title}
                message={message.message}
              />
            ))}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}
