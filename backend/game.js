// game.js

const spotify = require('./spotify');
const {v4: uuidv4 } = require('uuid');

// Placeholder for storing game state (replace this with a proper data structure for your game)
let gameState = {
  currentRound: null,
  // Add more game state properties as needed
};


// Function to create a new game
const createNewGame = async (socket, playlist_id, round) => {
  try {
    console.log('Creating game session')
    // Generate a unique UUID for the game session
    const uuid = uuidv4();

    // Create a new game with specified properties
    // Write the game session to the database with playlist_id, round, and UUID (you'll need to implement this part)
    // For simplicity, I'm just returning the UUID for now
    const gameSessionInfo = {
      playlist_id,
      round,
      uuid,
    };

    // Emit 'gameCreated' event to the client with game information
    socket.emit('gameCreated', { info: gameSessionInfo });

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
  createNewGame,
  handleGuessYearRound,
  handleSubmitAnswer,
};
