import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');

function App() {
  const [playlistId, setPlaylistId] = useState('');
  const [selectedRound, setSelectedRound] = useState('guessTheYear');
  const [gameCreated, setGameCreated] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('gameCreated', ({ info }) => {
      setGameCreated(true);
      setGameInfo(info);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      // socket.disconnect();
    };
  }, []);

  const createGame = () => {
    // Validate playlist ID before creating the game
    if (!playlistId.trim()) {
      alert('Please enter a valid playlist ID.');
      return;
    }

    // Send a request to the server to create the game
    console.log('Send request to server')
    socket.emit('createGame', { playlist_id: playlistId, round: selectedRound });
  };

  return (
    <div>
      <h1>TuneTrivia</h1>
      {!gameCreated ? (
        <div>
          <label>
            Playlist ID:
            <input type="text" value={playlistId} onChange={(e) => setPlaylistId(e.target.value)} />
          </label>
          <br />
          <label>
            Select Round:
            <select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)}>
              <option value="guessTheYear">Guess the Year</option>
              {/* Add more rounds in the future */}
            </select>
          </label>
          <br />
          <button onClick={createGame}>Create Game</button>
        </div>
      ) : (
        <div>
          <h2>Game Created!</h2>
          <p>Playlist ID: {gameInfo.playlist_id}</p>
          <p>Round: {gameInfo.round}</p>
          <p>Game UUID: {gameInfo.uuid}</p>
          {/* You can display additional game-related information here */}
        </div>
      )}
    </div>
  );
}

export default App;
