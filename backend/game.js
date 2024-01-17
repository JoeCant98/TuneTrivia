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
    const tracks = await spotify.getRandomTrackByGenre(genre, accessToken);

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
const handleGuessYearRound = async (playlist_id) => {
    try {
      // Get access token from Spotify
      const accessToken = await spotify.getAccessToken();
  
      // Get a random track from the specified playlist and playlist_id
      const randomTrack = await spotify.getRandomTrackByPlaylistId(playlist_id, accessToken);
  
      // Get the correct release year
      const correctYear = new Date(randomTrack.album.release_date).getFullYear();
  
      // Generate a random range of 20 years around the correct answer
      var randomSpread = Math.floor(Math.random() * 11)
      var firstEnd = correctYear - randomSpread
      var secondEnd = firstEnd + 20

      gameState.currentRound = {
        type: 'guess-year',
        correctAnswer: correctYear,
      };

      // Respond with the details for the user
      return{
        songTitle: randomTrack.name,
        artist: randomTrack.artists.map((artist) => artist.name).join(', '),
        yearRange: { firstEnd, secondEnd },
      };
    } catch (error) {
      console.error('Error handling Guess Year round:', error);
    }
  };

// Function to handle the Submit Answer endpoint
const handleSubmitAnswer = async (guess) => {
    try {
  
      // You would compare the user's answer with the correct answer obtained from the client
      // In a real application, you might want to store correct answers in a database or a session
      const correctAnswer = gameState.currentRound.correctAnswer; // Replace with the actual correct answer
  
      // Determine if the user's answer is correct
      const isCorrect = guess === correctAnswer;
  
      // Respond with the correctness of the answer
      return{
        correct: isCorrect,
        answer: correctAnswer,
      };
    } catch (error) {
      console.error('Error handling Submit Answer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  startNewGame,
  handleGuessYearRound,
  handleSubmitAnswer,
};
