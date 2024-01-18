const game = require('./game');

// Function to configure Socket.IO and handle socket events
const configureSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle the createGame event
    socket.on('createGame', async ({ playlist_id, round }) => {
      try {
        // Call the createNewGame function from the game module
        const result = await game.createNewGame(socket, playlist_id, round);
        console.log(result);
      } catch (error) {
        console.error('Error creating game:', error);
        // Handle the error, emit an error event, or send an error message to the client if needed
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = configureSocket;