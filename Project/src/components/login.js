// components/Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setLoading(true); // Set loading state to true

    try {
      await login(email, password); // Attempt to login
      navigate('/'); // Redirect to homepage on successful login
    } catch (err) {
      setError(err.message); // Set error message if login fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      <button type="submit" disabled={loading}> {/* Disable button when loading */}
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;