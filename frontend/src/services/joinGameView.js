// joinGameView.js
import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4001'); // Replace with your server address

function JoinGameView() {
  const [uuid, setUuid] = useState('');
  const [joined, setJoined] = useState(false);

  const joinGame = () => {
    // Validate UUID before joining the game
    if (!uuid.trim()) {
      alert('Please enter a valid game UUID.');
      return;
    }

    // Send a request to the server to join the game
    socket.emit('joinGame', { uuid });

    // Listen for the acknowledgment from the server
    socket.on('gameJoined', ({ success, error }) => {
      if (success) {
        setJoined(true);
      } else {
        alert(`Error joining game: ${error}`);
      }
    });
  };

  return (
    <div>
      {!joined ? (
        <div>
          <label>
            Game UUID:
            <input type="text" value={uuid} onChange={(e) => setUuid(e.target.value)} />
          </label>
          <br />
          <button onClick={joinGame}>Join Game</button>
        </div>
      ) : (
        <div>
          <h2>Game Joined!</h2>
          <p>Game UUID: {uuid}</p>
          {/* Display other game details as needed */}
          <button onClick={() => console.log('Start Game')}>Start Game</button>
        </div>
      )}
    </div>
  );
}

export default JoinGameView;
