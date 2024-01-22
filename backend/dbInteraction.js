// db_interaction.js
const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite database
const db = new sqlite3.Database('./tunetrivia.db');

// Function to create the 'games' table
const createGamesTable = () => {
  const db = new sqlite3.Database('./tunetrivia.db');

  db.serialize(() => {
    // Create 'games' table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid TEXT NOT NULL,
        playlist_id TEXT NOT NULL,
        rounds INTEGER NOT NULL
      )
    `);
  });

  db.close();
};

// Function to mark a game as started in the database
const startGame = (uuid) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE games SET game_started = 1 WHERE uuid = ?';
    db.run(sql, [uuid], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Function to check if a game has started in the database
const checkGameStarted = (uuid) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT game_started FROM games WHERE uuid = ?';
    db.get(sql, [uuid], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row && row.game_started === 1);
      }
    });
  });
};


const createNewGameInDB = (uuid, playlist_id, rounds) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO games (uuid, playlist_id, rounds) VALUES (?, ?, ?)',
      [uuid, playlist_id, rounds],
      (err) => {
        if (err) {
          console.error('Error creating game in the database:', err);
          reject(err);
        } else {
          console.log(`Game ${uuid} created successfully in the database`);
          resolve({ uuid, playlist_id, rounds });
        }
      }
    );
  });
};

module.exports = {
  createNewGameInDB,
  createGamesTable,
  startGame,
  checkGameStarted
};
