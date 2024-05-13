import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/MasomoLMS-auth.svg';
import './auth.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Submitting signup form:', formData);

      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password
        })
      });
      console.log('Signup response:', response);

      const data = await response.json();
      console.log('Signup data:', data);

      if (response.ok) {
        // Signup successful, handle token storage or redirection
        console.log('Signup successful:', data);
        localStorage.setItem('token', data.token); // Store token in localStorage
        // Check if signup message contains 'User created successfully!'
        if (data.message && data.message.includes('User created successfully!')) {
          // Redirect user to login page
          navigate('/login');
        }
      } else {
        // Signup failed, display error message
        console.log('Signup failed:', data);
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="MasomoLMS Logo" className="auth-logo" />
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="auth-form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
        </div>
        <div className="auth-form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password">Enter Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="auth-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button type="submit" className="auth-primary-button">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
