// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl mb-4">Welcome to Our App</h1>
            <div>
                <Link to="/signup" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                    Sign Up
                </Link>
                <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Home;