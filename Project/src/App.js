// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/footer'; // Ensure this component is correctly exported
import HomePage from './pages/Homepage'; // Ensure correct export
import LoginPage from './pages/LoginPage'; // Ensure correct export
import SignupPage from './pages/SignupPage'; // Ensure correct export
import DashboardPage from './pages/Dashboard'; // Ensure correct export
import ProfilePage from './pages/Profile'; // Ensure correct export

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* Ensure this is correct */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;