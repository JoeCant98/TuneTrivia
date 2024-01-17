const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize SQLite database
const db = new sqlite3.Database('./tunetrivia.db');

// Define your routes and socket.io logic here

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
