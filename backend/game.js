// game.js

const spotify = require('./spotify');
const dbInteraction = require('./dbInteraction');
const {v4: uuidv4 } = require('uuid');

// Placeholder for storing game state (replace this with a proper data structure for your game)
let gameState = {
  currentRound: null,
  // Add more game state properties as needed
};


// Function to create a new game and handle socket rooms
const createNewGame = async (socket, playlist_id, rounds) => {
  try {
    // Generate a unique identifier for the game (you can use a library like uuid)
    const uuid = uuidv4().substring(0, 4);

    // Insert game information into the database
    await dbInteraction.createNewGameInDB(uuid, playlist_id, rounds);

    console.log(`User ${socket.id} created ${uuid}`);

    // Emit an event to the client to inform them that the game was created successfully
    socket.emit('gameCreated', { info: { uuid, playlist_id, rounds } });

    return { success: true, uuid, playlist_id, rounds };
  } catch (error) {
    console.error('Error creating game:', error);
    // Handle the error, emit an error event, or send an error message to the client if needed
    return { success: false, error: 'Error creating game' };
  }
};

const startGame = (uuid) => {
  // Emit an event to all clients in the room identified by the game UUID
  // dbInteraction.startGame(uuid); // write function to update status in db
  io.to(uuid).emit('gameStarted', { success: true });

  // Additional logic to handle starting the game
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
  startGame
};
