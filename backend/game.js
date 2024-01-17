// game.js

const spotify = require('./spotify');

// Placeholder for storing game state (replace this with a proper data structure for your game)
let gameState = {
  currentRound: null,
  // Add more game state properties as needed
};

// Function to start a new game
const startNewGame = async (genre) => {
  try {
    // Get an access token from Spotify
    const accessToken = await spotify.getAccessToken();

    // Search for tracks based on the predefined genre
    const tracks = await spotify.searchTracksByGenre(genre, accessToken);

    // Set the current round to the "Guess the Year" round with the retrieved tracks
    gameState.currentRound = {
      type: 'guess-year',
      tracks,
    };

    return { success: true, message: 'Game started successfully' };
  } catch (error) {
    console.error('Error starting the game:', error);
    return { success: false, error: 'Internal Server Error' };
  }
};

// Function to handle the "Guess the Year" round
const handleGuessYearRound = (userYear) => {
  // Implement logic to handle the "Guess the Year" round
  // Update game state or calculate scores based on the correctness of the user's guess
  return { success: true, isCorrect: true }; // Placeholder response
};

module.exports = {
  startNewGame,
  handleGuessYearRound,
};
