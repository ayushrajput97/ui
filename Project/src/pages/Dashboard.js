import axios from 'axios';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import '../index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;
const GIFS_PER_PAGE = 10; 
const VIDEO_API_KEY = 'KFdtRzJESUBYW5CoBG4rOHJHaYGBW792T10TV0WigUbnGlF3V2uA05rC';
const endpoint = 'https://api.giphy.com/v1/gifs/search';

const requestGif = async ({
  apiKey,
  lang = 'en',
  limit = '1',
  offset = '0',
  rating = 'G',
  term = 'shrug',
}) => {
  const queryUri = `?api_key=${apiKey}&q=${term}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;
  const response = await fetch(endpoint + queryUri);
  if (!response.ok) throw new Error('Failed to fetch GIFs');
  return response.json();
};

function Dashboard() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalGifsPages, setTotalGifsPages] = useState(0);
  const [totalVideosPages, setTotalVideosPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchType, setSearchType] = useState('images');
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const query = searchInput.current.value || 'a'; // Use 'a' as the default value
const { data } = await axios.get(
    `${API_URL}?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=haX20yu-890kcdFCR_aWyEqG7HBGpgYevhwNl1Do0Qg`
);
setImages(data.results);
setTotalPages(data.total_pages);
      
    } catch (error) {
      setErrorMsg('Failed to fetch images');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchGifs = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const term = searchInput.current.value || 'champions';
      const gifData = await requestGif({
        apiKey: 'hSeLixSvqGYQq617fSJXcDa425KoQG6l',
        term,
        limit: GIFS_PER_PAGE,
        offset: (page - 1) * GIFS_PER_PAGE
      });
      setGifs(gifData.data);
      setTotalGifsPages(Math.ceil(gifData.pagination.total_count / GIFS_PER_PAGE));
    } catch (error) {
      setErrorMsg('Failed to fetch GIFs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const term = searchInput.current.value || 'b';
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${term}&page=${page}&per_page=10`,
        {
          headers: {
            Authorization: VIDEO_API_KEY,
          },
        }
      );
      const responseJson = await res.json();
      if (responseJson.videos) {
        setVideos(responseJson.videos);
        setTotalVideosPages(Math.ceil(responseJson.total_results / 10)); // Corrected per_page to 10
      } else {
        setVideos([]);
      }
    } catch (error) {
      setErrorMsg('Failed to fetch videos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (searchType === 'images') {
      fetchImages();
    } else if (searchType === 'gifs') {
      fetchGifs();
    } else if (searchType === 'videos') {
      fetchVideos();
    }
  }, [fetchImages, fetchGifs, fetchVideos, page, searchType]);

  const resetSearch = () => {
    setPage(1); // Reset page to 1 on new search
    if (searchType === 'images') {
      fetchImages();
    } else if (searchType === 'gifs') {
      fetchGifs();
    } else if (searchType === 'videos') {
      fetchVideos();
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  useEffect(() => {
    setPage(1); // Reset the page whenever the searchType changes
  }, [searchType]);

  return (
    <>
      <div className='container'>
        <h1 className='title'>Welcome to Our GIV <span className="firstR">R</span><span className="secondR">E</span><span className="thirdR">S</span><span className="fourthR">T</span> App</h1>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        <div className="search-section">
          <form onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="GIV REST Search"
              className='search-input'
              ref={searchInput}
            />
            <div className="wrapper_giv">
              <label className={`option ${searchType === 'images' ? 'selected' : ''}`} onClick={() => setSearchType('images')}>
                <input type="radio" value="images" checked={searchType === 'images'} onChange={() => setSearchType('images')} />
                Images
              </label>
              <label className={`option ${searchType === 'gifs' ? 'selected' : ''}`} onClick={() => setSearchType('gifs')}>
                <input type="radio" value="gifs" checked={searchType === 'gifs'} onChange={() => setSearchType('gifs')} />
                GIFs
              </label>
              <label className={`option ${searchType === 'videos' ? 'selected' : ''}`} onClick={() => setSearchType('videos')}>
                <input type="radio" value="videos" checked={searchType === 'videos'} onChange={() => setSearchType('videos')} />
                Videos
              </label>
            </div>
            <div className='rest_btn'>
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
        <div className="filters">
          <div onClick={() => handleSelection('Fitness')}>Fitness and Exercise</div>
          <div onClick={() => handleSelection('Traveling')}>Traveling</div>
          <div onClick={() => handleSelection('Oceans')}>Oceans</div>
        </div>
        
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <div className="images">
              {searchType === 'images' && images.map((image) => (
                <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
              ))}
            </div>
            <div className="gifs">
              {searchType === 'gifs' && gifs.map((gif) => (
                <img key={gif.id} src={gif.images.fixed_height_small.url} alt={gif.title} className='gif' />
              ))}
            </div>
            <div className="videos">
              {searchType === 'videos' && videos.length > 0 ? (
                videos.map((video) => (
                  <video 
                    key={video.id} 
                    controls 
                    className='video' 
                    onMouseEnter={(e) => e.currentTarget.play()} 
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  >
                    <source src={video.video_files[0].link} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))
              ) : (
                searchType === 'videos' && <p>No videos found.</p>
              )}
            </div>
          </>
        )}

        <div className='buttons'>
          {searchType === 'images' && (
            <>
              {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
              {page < totalPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
            </>
          )}
          {searchType === 'gifs' && (
            <>
              {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
              {page < totalGifsPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
            </>
          )}
          {searchType === 'videos' && (
            <>
              {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
              {page < totalVideosPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;