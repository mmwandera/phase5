import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/MasomoLMS-auth.svg';
import './auth.css';

export default function Login() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();

      if (response.ok) {
        // Login successful, handle token storage or redirection
        localStorage.setItem('token', data.token); // Store token in localStorage
        navigate('/'); // Redirect user to home page
      } else {
        // Login failed, display error message
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="MasomoLMS Logo" className="auth-logo" />
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="auth-primary-button">Login</button>
      </form>
      <p>Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link></p>
    </div>
  );
}
