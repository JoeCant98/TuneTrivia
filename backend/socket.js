const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Define your socket.io event handlers here

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
