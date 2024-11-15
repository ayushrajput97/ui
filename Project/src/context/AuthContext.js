// context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is OK (status in the range 200-299)
      

      if (!response.ok) {
        // Handle errors other than 204
      
        throw new Error(`Sorry You got wrong credentials`);
      }

      // If response is OK and not 204, parse the JSON data
      const data = await response.json();
      setUser (data.user); // Assuming data.user contains user information
      return data; // Return user data or some success indicator
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be caught in the Login component
    }
  };

  const logout = () => {
    setUser (null); // Clear user state on logout
  };

  const isAuthenticated = () => {
    return user !== null; // Check if user is authenticated
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};