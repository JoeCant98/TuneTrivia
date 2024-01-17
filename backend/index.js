const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const game = require('./game');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
// Initialize SQLite database
const db = new sqlite3.Database('./tunetrivia.db');

// Endpoint to start a new game
app.post('/api/start-game', async (req, res) => {
  const { genre } = req.body;
  const result = await game.startNewGame(genre);
  res.json(result);
});

// Endpoint to handle the "Guess the Year" round
app.post('/api/round/guess-year', async (req, res) => {
  const { playlist_id } = req.body;
  const result = await game.handleGuessYearRound(playlist_id);
  console.log(result);
  res.json(result);
});

// Endpoint to handle the "Guess the Year" round
app.post('/api/round/guess-year/guess', async (req, res) => {
    const { guess } = req.body;
    const result = await game.handleSubmitAnswer(guess);
    console.log(result);
    res.json(result);
  });

const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
