import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, User } from 'lucide-react';

const Square = ({ value, onClick, isWinner, isDisabled }) => (
  <motion.button
    whileHover={!value && !isDisabled ? { scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" } : {}}
    whileTap={!value && !isDisabled ? { scale: 0.95 } : {}}
    onClick={onClick}
    disabled={isDisabled || !!value}
    className={`relative h-24 w-24 sm:h-32 sm:w-32 rounded-3xl flex items-center justify-center text-5xl font-black transition-all duration-500
      ${isWinner ? 'bg-indigo-600 shadow-[0_0_40px_rgba(79,70,229,0.7)] z-20 scale-105' : 'bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl'}
      ${!value && !isDisabled ? 'cursor-pointer' : 'cursor-default'}
    `}
  >
    <AnimatePresence mode="wait">
      {value && (
        <motion.span
          key={value}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={isWinner ? 'text-white' : value === 'X' ? 'text-indigo-400' : 'text-rose-400'}
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const isDraw = !winner && squares.every(s => s);

  useEffect(() => {
    if (winner) setScores(s => ({ ...s, [winner]: s[winner] + 1 }));
  }, [winner]);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
      
      {/* Centered Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl font-black tracking-tighter uppercase"
        >
          Tic Tac <span className="text-indigo-500">Toe</span>
        </motion.h1>
        <div className="h-1 w-24 bg-indigo-500 mx-auto mt-4 rounded-full opacity-50" />
      </div>

      {/* Scoreboard Container */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-4 mb-10">
        <div className={`p-5 rounded-[2rem] border transition-all duration-500 ${xIsNext && !winner ? 'bg-indigo-500/10 border-indigo-500/50 scale-105' : 'bg-white/5 border-transparent opacity-30'}`}>
          <div className="flex items-center gap-2 mb-1">
            <User size={14} className="text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Player X</span>
          </div>
          <span className="text-4xl font-black">{scores.X}</span>
        </div>

        <div className={`p-5 rounded-[2rem] border transition-all duration-500 ${!xIsNext && !winner ? 'bg-rose-500/10 border-rose-500/50 scale-105' : 'bg-white/5 border-transparent opacity-30'}`}>
          <div className="flex items-center gap-2 mb-1">
            <User size={14} className="text-rose-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300">Player O</span>
          </div>
          <span className="text-4xl font-black">{scores.O}</span>
        </div>
      </div>

      {/* The Board */}
      <motion.div 
        layout
        className="p-4 bg-white/[0.03] border border-white/10 rounded-[3rem] backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        <div className="grid grid-cols-3 gap-4">
          {squares.map((sq, i) => (
            <Square 
              key={i} 
              value={sq} 
              onClick={() => handleClick(i)} 
              isWinner={winnerInfo?.line.includes(i)} 
              isDisabled={!!winner}
            />
          ))}
        </div>
      </motion.div>

      {/* Game State & Controls */}
      <div className="mt-12 h-20 flex flex-col items-center justify-center gap-6">
        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div 
              key="winner"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4"
            >
              <div className="bg-indigo-500 text-white px-6 py-2 rounded-full font-black text-sm uppercase flex items-center gap-2 shadow-lg shadow-indigo-500/30">
                <Trophy size={16} /> {winner} Wins!
              </div>
              <button onClick={resetGame} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <RotateCcw size={20} />
              </button>
            </motion.div>
          ) : isDraw ? (
            <motion.div key="draw" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
              <span className="text-slate-400 font-black uppercase tracking-widest text-sm">It's a Draw</span>
              <button onClick={resetGame} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <RotateCcw size={20} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ rotate: 15 }}
              onClick={resetGame}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <RotateCcw size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return { winner: squares[a], line: [a,b,c] };
  }
  return null;
}