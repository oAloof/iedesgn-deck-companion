import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Dices, User, ToggleLeft, ToggleRight } from 'lucide-react';

const DeckDrawer = () => {
  const [gameState, setGameState] = useState('default');
  const [isRolling, setIsRolling] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const [results, setResults] = useState([]);
  const [intermediateState, setIntermediateState] = useState(null);
  const [autoDrawEnabled, setAutoDrawEnabled] = useState(false);

  const performRoll = () => {
    return new Promise((resolve) => {
      let iterations = 0;
      const maxIterations = 6;
      const interval = setInterval(() => {
        setIntermediateState(Math.random() < 0.5 ? 'action' : 'bodyPart');
        iterations++;
        
        if (iterations >= maxIterations) {
          clearInterval(interval);
          const finalRoll = Math.random();
          const newState = finalRoll < 0.6 ? 'action' : 'bodyPart';
          resolve(newState);
        }
      }, 100);
    });
  };

  const handleRoll = async () => {
    if (drawCount >= 2) {
      // Reset for next turn
      setDrawCount(0);
      setResults([]);
      setGameState('default');
      return;
    }

    setIsRolling(true);
    const result = await performRoll();
    
    setResults(prev => [...prev, result]);
    setGameState(result);
    const newDrawCount = drawCount + 1;
    setDrawCount(newDrawCount);
    setIsRolling(false);
    setIntermediateState(null);

    // Auto-draw second card if enabled
    if (autoDrawEnabled && newDrawCount === 1) {
      setTimeout(async () => {
        setIsRolling(true);
        const secondResult = await performRoll();
        setResults(prev => [...prev, secondResult]);
        setGameState(secondResult);
        setDrawCount(2);
        setIsRolling(false);
        setIntermediateState(null);
      }, 700); // Small delay before auto-drawing second card
    }
  };

  const RollButton = ({ color = "slate", size = "large" }) => {
    const isNewTurn = drawCount >= 2;
    const buttonText = isRolling 
      ? 'Rolling...' 
      : isNewTurn 
        ? 'Start New Turn'
        : size === 'large' 
          ? 'Press to Roll' 
          : 'Draw Again';

    return (
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className={`group relative ${size === 'large' ? 'w-48 h-48' : 'w-40 h-40'} rounded-full 
          bg-slate-900 hover:bg-slate-800
          text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 
          disabled:opacity-75 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-200" />
        <div className="relative flex flex-col items-center justify-center gap-3 p-2">
          <Dices size={size === 'large' ? 36 : 28} className="animate-bounce" />
          <span className={`${size === 'large' ? 'text-xl' : 'text-lg'} whitespace-normal px-2`}>
            {buttonText}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-slate-900 shadow-sm p-4 flex items-center justify-between">
        <div className="text-xl font-bold text-white">
          Deck Drawer
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/sets"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <User size={24} />
            <span className="text-lg font-medium">Sets</span>
          </Link>
          <Link 
            to="/rulebook"
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <Book size={24} />
            <span className="text-lg font-medium">Rules</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          className={`w-full max-w-sm bg-slate-900 rounded-2xl shadow-lg p-6 transition-all duration-300
            ${isRolling ? 'animate-pulse' : ''}`}
        >
          {/* Auto-draw Toggle */}
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-gray-400">Auto-draw second card:</span>
            <button
              onClick={() => setAutoDrawEnabled(!autoDrawEnabled)}
              className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
            >
              {autoDrawEnabled ? (
                <ToggleRight size={28} className="text-red-400" />
              ) : (
                <ToggleLeft size={28} />
              )}
            </button>
          </div>

          {/* Draw Counter */}
          <div className="text-center mb-6">
            <p className="text-gray-400">
              Draws this turn: <span className="text-white font-bold">{drawCount}/2</span>
            </p>
          </div>

          {gameState === 'default' && !isRolling && (
            <div className="text-center space-y-8">
              <h1 className="text-3xl font-bold text-white">Deck Drawer</h1>
              <div className="flex justify-center">
                <RollButton />
              </div>
            </div>
          )}

          {isRolling && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-red-400 animate-pulse">
                  {intermediateState === 'action' ? 'Action Card' : 'Body Part'}
                </h2>
                <div className="flex justify-center">
                  <Dices size={48} className="animate-spin text-red-400" />
                </div>
              </div>
            </div>
          )}

          {gameState === 'bodyPart' && !isRolling && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-red-400">Body Part</h2>
                <p className="text-lg text-gray-400">Draw from the Body Part deck</p>
              </div>
              <div className="flex justify-center">
                <RollButton size="medium" />
              </div>
            </div>
          )}

          {gameState === 'action' && !isRolling && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-red-400">Action Card</h2>
                <p className="text-lg text-gray-400">Draw from the Action deck</p>
              </div>
              <div className="flex justify-center">
                <RollButton size="medium" />
              </div>
            </div>
          )}

          {/* Previous Results */}
          {results.length > 0 && !isRolling && (
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-gray-400 mb-3">Previous Draws:</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className="text-white bg-slate-800 rounded-lg p-3 flex justify-between items-center">
                    <span>Draw {index + 1}:</span>
                    <span className="font-bold text-red-400">{result === 'action' ? 'Action Card' : 'Body Part'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DeckDrawer;