// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/keywords');
        console.log(response.data); // Log the response
        setKeywords(response.data);
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <div>
      <h1>Keywords</h1>
      <ul>
        {Array.isArray(keywords) && keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))
        ) : (
          <li>No keywords found</li>
        )}
      </ul>
    </div>
  );
}

export default Profile;