const axios = require('axios');

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_CLIENT_ID = 'your_client_id';
const SPOTIFY_CLIENT_SECRET = 'your_client_secret';

// Function to get an access token from Spotify
const getAccessToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to search for tracks based on a genre
const searchTracksByGenre = async (genre, accessToken) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      params: {
        q: `genre:"${genre}"`,
        type: 'track',
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching for tracks on Spotify:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  getAccessToken,
  searchTracksByGenre,
};
