import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4001');

const CreateGameView = () => {
  const [playlistId, setPlaylistId] = useState('');
  const [selectedRound, setSelectedRound] = useState('guessTheYear');
  const [gameDetails, setGameDetails] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  const createGame = () => {
    // Validate playlist ID before creating the game
    if (!playlistId.trim()) {
      alert('Please enter a valid playlist ID.');
      return;
    }

    // Send a request to the server to create the game
    socket.emit('createGame', { playlist_id: playlistId, round: selectedRound });
  };

  const startGame = () => {
    // Emit an event to the server to start the game
    socket.emit('startGame');
  };

  useEffect(() => {
    // Listen for events from the server
    socket.on('gameCreated', ({ info }) => {
      setGameDetails(info);
    });

    socket.on('gameStarted', ({ questions }) => {
      setGameStarted(true);
      setQuestions(questions);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off('gameCreated');
      socket.off('gameStarted');
    };
  }, []);

  return (
    <div>
      {!gameDetails && (
      <>
      <h1>TuneTrivia - Create Game</h1>
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
      </>
      )}

      {gameDetails && !gameStarted && (
        <div>
          <h2>Game Details</h2>
          <p>Playlist ID: {gameDetails.playlist_id}</p>
          <p>Round: {gameDetails.round}</p>
          <p>Game UUID: {gameDetails.uuid}</p>
          <button onClick={startGame}>Start Game</button>
          {gameStarted ? (
            <>
              <h2>Game Started!</h2>
              {currentRound < questions.length ? (
                <>
                  <h3>Round {currentRound + 1}</h3>
                  <p>Question: {questions[currentRound].question}</p>
                  <p>Options: {questions[currentRound].options.join(', ')}</p>
                </>
              ) : (
                <p>No more rounds. Game completed!</p>
              )}
            </>
          ) : (
            gameStarted && currentRound === 0 && (
              <button onClick={startGame}>Start Game</button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CreateGameView;
