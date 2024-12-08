import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckDrawer from './components/DeckDrawer';
import Rulebook from './components/Rulebook';
import Sets from './components/Sets';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeckDrawer />} />
        <Route path="/rulebook" element={<Rulebook />} />
        <Route path="/sets" element={<Sets />} />
      </Routes>
    </Router>
  );
}

export default App;