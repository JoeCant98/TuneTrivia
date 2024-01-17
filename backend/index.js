const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const game = require('./game');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize SQLite database
const db = new sqlite3.Database('./tunetrivia.db');

// app.js
app.use(bodyParser.json());

// Endpoint to start a new game
app.post('/api/start-game', async (req, res) => {
  const { genre } = req.body;
  const result = await game.startNewGame(genre);
  res.json(result);
});

// Endpoint to handle the "Guess the Year" round
app.post('/api/round/guess-year', (req, res) => {
  const { userYear } = req.body;
  const result = game.handleGuessYearRound(userYear);
  res.json(result);
});

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
