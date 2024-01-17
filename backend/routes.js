const express = require('express');
const router = express.Router();
const { getAccessToken, searchTracksByGenre } = require('./spotify');

// Example usage in a route handler
app.get('/api/search-tracks', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const tracks = await searchTracksByGenre('pop', accessToken);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define your routes here

module.exports = router;
