// components/Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import legsImage from '../assets/images/2.png';

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
      navigate('/profile'); // Redirect to profile page on successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Set a user-friendly error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div class="container login_container">
       <h1 className='title'>Take Flight To Your GIV <span className="firstR">R</span><span className="secondR">E</span><span className="thirdR">S</span><span className="fourthR">T</span> App</h1>
    <form onSubmit={handleSubmit}>
      <div className='loginrest'>
        <label className='labelRest'>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='loginrest'>
        <label className='labelRest'>Password:</label>
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
    <img alt="legs" className='login_image' src={legsImage} />
    </div>
  );
};

export default Login;