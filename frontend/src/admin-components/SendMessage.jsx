import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './reusable-components/Footer';
import Header from './reusable-components/Header';
import './sendMessage.css';

export default function SendMessage() {
  const { studentId } = useParams(); // Extract studentId from URL
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/send-message/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content: message }),
      });

      if (response.ok) {
        setSuccessMessage('Message sent successfully'); // Set success message
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-management">
      <Header />
      <main className="admin-main">
        <h2>Send Message to User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      </main>
      <Footer />
    </div>
  );
}