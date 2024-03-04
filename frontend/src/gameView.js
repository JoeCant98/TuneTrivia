// GameView.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4001'); // Replace with your server address

function GameView() {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    // Listen for events from the server
    socket.on('roundsUpdated', ({ updatedRounds }) => {
      setRounds(updatedRounds);
    });

    // Listen for events related to the current round
    socket.on('roundStarted', ({ questions }) => {
      setQuestions(questions);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('roundsUpdated');
      socket.off('roundStarted');
    };
  }, [currentRound]);

  const startNextRound = () => {
    // Notify the server to start the next round
    socket.emit('startNextRound');
  };

  const submitAnswer = (answer) => {
    // Notify the server of the user's answer
    socket.emit('submitAnswer', { round: currentRound, question: currentQuestion, answer });
  };

  return (
    <div>
      <h2>Game in Progress</h2>
      {rounds.length > 0 && currentRound < rounds.length ? (
        <div>
          <h3>Round {currentRound + 1}</h3>
          <button onClick={startNextRound}>Start Next Round</button>
        </div>
      ) : (
        <div>
          <h3>Game Over</h3>
          {/* Display final scores or other game-ending information */}
        </div>
      )}

      {questions.length > 0 && currentQuestion < questions.length ? (
        <div>
          <h4>Question {currentQuestion + 1}</h4>
          <p>{questions[currentQuestion].text}</p>
          {/* Display options and handle user input */}
          {/* Example: */}
          <button onClick={() => submitAnswer('Option A')}>Option A</button>
          <button onClick={() => submitAnswer('Option B')}>Option B</button>
          {/* Add more options as needed */}
        </div>
      ) : null}
    </div>
  );
}

export default GameView;
