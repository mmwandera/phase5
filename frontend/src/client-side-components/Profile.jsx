import axios from 'axios';
import { useEffect, useState } from 'react';
import './profile.css';
import HomeFooter from './reusable-components/HomeFooter';
import HomeHeader from './reusable-components/HomeHeader';
import MessageCards from './reusable-components/MessageCards';

export default function Profile() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const studentId = localStorage.getItem('studentId'); // Get student ID from localStorage
        const response = await axios.get(`http://127.0.0.1:5000/user/${studentId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Fetch user messages
    const fetchUserMessages = async () => {
      try {
        const studentId = localStorage.getItem('studentId'); // Get student ID from localStorage
        const response = await axios.get(`http://127.0.0.1:5000/messages/${studentId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching user messages:', error);
      }
    };

    fetchUserDetails();
    fetchUserMessages();
  }, []);

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(message => message.id !== messageId));
  };

  return (
    <div className="profile">
      <HomeHeader />
      <main className="profile-main">
        <h1 className="profile-heading">Profile</h1>
        <div className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email Address:</strong> {user.email}</p>
        </div>
        <div className="messages">
          <h2 className="messages-heading">Messages</h2>
          {messages.length > 0 ? (
            messages.map(message => (
              <MessageCards
                key={message.id}
                id={message.id}
                title={message.title}
                message={message.content}
                onDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages</p>
          )}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
}