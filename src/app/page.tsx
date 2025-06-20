'use client';

import { useEffect, useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  const renderSymbol = () => {
    if (value === 'X') {
      // Unicode Decorative X (slightly larger)
      return <span className="text-5xl text-gray-50 font-bold">✗</span>;
    } else if (value === 'O') {
      // Thick SVG circle to match the bold X
      return (
        <svg className="w-12 h-12 text-gray-50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="8" strokeWidth={4} />
        </svg>
      );
    }
    return null;
  };

  return (
    <button
      className="w-16 aspect-square bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
      onClick={onSquareClick}
    >
      {renderSymbol()}
    </button>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let idx = 0; idx < lines.length; idx++) {
    const [a, b, c] = lines[idx];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return; // Prevent further clicks if square is filled
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    console.log(`Square ${i} clicked: ${xIsNext ? 'X' : 'O'}`);

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    const winnerSymbol = winner === 'X' ? '✗' : 'O';
    status = `Winner: ${winnerSymbol}`;
  } else {
    const nextSymbol = xIsNext ? '✗' : 'O';
    status = `Next player: ${nextSymbol}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-gray-50 text-xl font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-1 p-1 bg-gray-500">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  // Initialize history as an array of arrays, starting with the initial state
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'z' && history.length > 1) {
        const newHistory = history.slice(0, -1);
        setHistory(newHistory);
        setXIsNext(history.length % 2 === 0);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history]);

  function handlePlay(nextSquares: (string | null)[]) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-5">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </div>
  );
}