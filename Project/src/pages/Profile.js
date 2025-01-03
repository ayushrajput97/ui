// frontend/src/components/Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import requestGif from '../pages/request';

const IMAGES_PER_PAGE = 2; // Set the number of images per keyword to display
const GIFS_PER_PAGE = 2; // Set the number of GIFs per page
const VIDEO_API_KEY = 'KFdtRzJESUBYW5CoBG4rOHJHaYGBW792T10TV0WigUbnGlF3V2uA05rC';

function Profile() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [media, setMedia] = useState([]); // Store all media (images, GIFs, videos)

  const API_URL = 'https://api.unsplash.com/search/photos';

  const fetchImages = useCallback(async (query) => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${query}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=haX20yu-890kcdFCR_aWyEqG7HBGpgYevhwNl1Do0Qg`
      );
      return data.results;
    } catch (error) {
      setErrorMsg('Failed to fetch images');
      console.log(error);
    }
  }, []);

  const fetchGifs = useCallback(async (term) => {
    try {
      const gifData = await requestGif({ apiKey: 'hSeLixSvqGYQq617fSJXcDa425KoQG6l', term, limit: GIFS_PER_PAGE });
      return gifData.data;
    } catch (error) {
      setErrorMsg('Failed to fetch GIFs');
      console.log(error);
    }
  }, []);

  const fetchVideos = useCallback(async (term) => {
    try {
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${term}&page=1&per_page=2`,
        {
          headers: {
            Authorization: VIDEO_API_KEY,
          },
        }
      );
      const responseJson = await res.json();
      return responseJson.videos || [];
    } catch (error) {
      setErrorMsg('Failed to fetch videos');
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchKeywords = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/keywords');
        setKeywords(response.data);

        const allMedia = await Promise.all(response.data.map(async (keyword) => {
          const images = await fetchImages(keyword);
          const gifs = await fetchGifs(keyword);
          const videos = await fetchVideos(keyword);
          return { keyword, images, gifs, videos };
        }));

        setMedia(allMedia);
      } catch (error) {
        console.error('Error fetching keywords:', error.response ? error.response.data : error.message);
        setErrorMsg('Failed to fetch keywords');
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, [fetchImages, fetchGifs, fetchVideos]);

  return (
    <div>
      <h1>Welcome to Your GIV<span class="firstR">R</span><span class="secondR">E</span><span class="thirdR">S</span><span class="fourthR">T</span> Profile </h1>
      {loading && <p>Loading...</p>}
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}

      {media.length > 0 ? (
        media.map(({ keyword, images, gifs, videos }) => (
          <div key={keyword} className="media-section">
            <h2 className="interest_item">{keyword}</h2>
            <div className="media-container">
              <div className="media-column">
                <h3>Images</h3>
                {images.length > 0 ? (
                  <div className="image-grid">
                    {images.map((image) => (
                      <img key={image.id} src={image.urls.small} alt={image.alt_description} />
                    ))}
                  </div>
                ) : (
                  <p>No images found.</p>
                )}
              </div>

              <div className="media-column">
                <h3>GIFs</h3>
                {gifs.length > 0 ? (
                  <div className="gif-grid">
                    {gifs.map((gif) => (
                      <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />                    ))}
                      </div>
                    ) : (
                      <p>No GIFs found.</p>
                    )}
                  </div>
    
                  <div className="media-column">
                    <h3>Videos</h3>
                    {videos.length > 0 ? (
                      <div className="video-grid">
                        {videos.map((video) => (
                          <div key={video.id} className="video-item">
                            <video width="320" height="240" controls>
                              <source src={video.video_files[0].link} type="video/mp4" />
                              
                            </video>
                           
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No videos found.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No media available.</p>
          )}
        </div>
      );
    }
    
    export default Profile;