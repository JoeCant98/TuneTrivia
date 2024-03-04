import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateGameView from './createGameView';
import JoinGameView from './joinGameView';

function Home() {
  return (
    <div>
      <h2>Welcome to TuneTrivia</h2>
      <p>Choose an option:</p>
      <ul>
        <li><Link to="/create-game">Create Game</Link></li>
        <li><Link to="/join-game">Join Game</Link></li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-game" element={<CreateGameView />} />
        <Route path="/join-game" element={<JoinGameView />} />
      </Routes>
    </Router>
  );
}

export default App;
