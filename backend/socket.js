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
        result.creatorSocketId = socket.id;

        socket.join(result.uuid);

        io.emit('gameCreated', {info: result });

        console.log(result);
      } catch (error) {
        console.error('Error creating game:', error);
        // Handle the error, emit an error event, or send an error message to the client if needed
      }
    });

    // Handle the startGame event
    socket.on('startGame', ({ uuid }) => {
      // Broadcast to all sockets in the game room that the game has started
      game.startGame(uuid);
      io.to(uuid).emit('gameStarted');
    });

        // Handle the joinGame event
    socket.on('joinGame', ({ uuid }) => {
      try {
        // Join the socket to the specified room
        socket.join(uuid);

        // Emit an event to acknowledge the successful join
        socket.emit('gameJoined', { success: true, uuid });

        console.log(`User ${socket.id} joined ${uuid}`);
      } catch (error) {
        console.error('Error joining game:', error);
        // Handle the error, emit an error event, or send an error message to the client if needed
        socket.emit('gameJoined', { success: false, error: 'Error joining game' });
      }
    });

    // Handle the startNextRound event
    socket.on('startNextRound', () => {
      // Notify all clients in the room to start the next round
      io.to(socket.rooms.values().next().value).emit('roundStarted', { questions: getQuestionsForRound() });
    });

    // Handle the submitAnswer event
    socket.on('submitAnswer', ({ round, question, answer }) => {
      // Process the submitted answer and update game state as needed
      // You might want to emit events to notify other clients of the submitted answer
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = configureSocket;