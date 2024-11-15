// src/pages/SignupPage.js
import React, { useState } from 'react';
import axios from '../utils/axiosInstance'; // Import your Axios instance

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/signup', { email, password });
      console.log(response.data);
      setSuccess(true);
      // Handle successful signup (e.g., redirect or show a success message)
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Signup successful!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;