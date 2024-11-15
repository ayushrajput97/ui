// frontend/src/SignupPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_KEYWORD = 1; // Fetch 1 image per keyword
const keywords = ['Adventure', 'Fantasy', 'Gaming', 'Romance', 'Fitness'];

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [images, setImages] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState(new Set());
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagePromises = keywords.map(keyword =>
                    axios.get(API_URL, {
                        params: {
                            query: keyword,
                            page: 1,
                            per_page: IMAGES_PER_KEYWORD,
                            client_id: 'haX20yu-890kcdFCR_aWyEqG7HBGpgYevhwNl1Do0Qg' // Replace with your actual access key
                        }
                    })
                );

                const responses = await Promise.all(imagePromises);
                const fetchedImages = responses.map(response => response.data.results[0]);
                setImages(fetchedImages);
            } catch (error) {
                setErrorMsg('Failed to fetch images');
                console.error('Error fetching images:', error.response ? error.response.data : error.message);
            }
        };

        fetchImages();
    }, []);

    const handleImageClick = (keyword) => {
        setSelectedKeywords(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(keyword)) {
                newSelected.delete(keyword);
            } else {
                newSelected.add(keyword);
            }
            return newSelected;
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const selectedKeywordsArray = Array.from(selectedKeywords); // Convert Set to Array

        try {
            // Send user data and selected keywords to your backend API to store in MongoDB
            const response = await axios.post('http://localhost:5000/api/auth/signup', { 
                username, 
                email, 
                password, 
                keywords: selectedKeywordsArray // Include keywords in the request
            });

            setSuccessMsg(response.data.message);
            setErrorMsg(''); // Clear any previous error messages
            // Reset the form
            setUsername('');
            setEmail('');
            setPassword('');
            setSelectedKeywords(new Set()); // Reset selected keywords
        } catch (error) {
            console.error('Error storing user data:', error);
            setErrorMsg(error.response ? error.response.data.message : 'Failed to store user data');
            setSuccessMsg(''); // Clear any previous success messages
        }
    };

    return (
        <div className="signup-page">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Signup</button>
            </form>

            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

            <div className="images">
                {images.length > 0 ? (
                    <div className="thumbnail-gallery">
                        {images.map((image, index) => {
                            const keyword = keywords[index];
                            const isSelected = selectedKeywords.has(keyword);
                            return (
                                <div 
                                    key={index} 
                                    className="image-thumbnail" 
                                    onClick={() => handleImageClick(keyword)} 
                                    style={{ opacity: isSelected ? 0.6 : 1, cursor: 'pointer' }} // Adjust opacity based on selection
                                >
                                    <h3>{keyword}</h3>
                                    <img src={image.urls.small} alt={image.alt_description} className='thumbnail' />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No images found. Please try again later.</p>
                )}
            </div>
        </div>
    );
};

export default SignupPage;