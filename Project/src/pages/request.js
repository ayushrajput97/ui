// request.js

const endpoint = 'https://api.giphy.com/v1/gifs/search';

/**
 * Function to check the response status
 * @param {Response} response - The response object from fetch
 * @returns {Response} - The response object if the status is OK
 * @throws {Error} - Throws an error if the status is not OK
 */
export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error('Network response was not ok');
};

/**
 * Function to parse JSON response
 * @param {Response} response - The response object from fetch
 * @returns {Promise<Object>} - The parsed JSON data
 */
export const parseJSON = (response) => response.json();

/**
 * Request data from Giphy API
 * @param {Object} params - Parameters for the request
 * @param {string} params.apiKey - Your Giphy API key
 * @param {string} [params.lang='en'] - Language for the search
 * @param {string} [params.limit='1'] - Number of GIFs to fetch
 * @param {string} [params.offset='0'] - Offset for pagination
 * @param {string} [params.rating='G'] - Rating for the GIFs
 * @param {string} [params.term='shrug'] - Search term for GIFs
 * @returns {Promise<Object>} - The response data from the Giphy API
 */
export default function requestGif({
  apiKey = '',  // <-- provide this!
  lang = 'en',
  limit = '1',
  offset = '0',
  rating = 'G',
  term = 'shrug',
} = {}) {
  const queryUri = `?api_key=${apiKey}&q=${term}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;

  return fetch(endpoint + queryUri)
    .then(checkStatus)
    .then(parseJSON);
}