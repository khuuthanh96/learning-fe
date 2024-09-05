import "./App.css";
import { useState } from "react";
import { Tooltip } from "antd";

function calculateWinner(squares: number[]) {
  if (squares.length < 3) {
    return null;
  }

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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function Square(props = { value: "", handleClick: () => {} }) {
  return (
    <button className="square" onClick={props.handleClick}>
      {props.value}
    </button>
  );
}

export function Board() {
  const [isXTurn, setIsXTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Next player: X");

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    let v = "X";
    setStatus("Next player: O");

    if (!isXTurn) {
      v = "O";
      setStatus("Next player: X");
    }

    nextSquares[i] = v;

    if (calculateWinner(nextSquares)) {
      if (isXTurn) {
        setStatus("Winner: X");
      } else {
        setStatus("Winner: O");
      }
    }

    setSquares(nextSquares);
    setIsXTurn(!isXTurn);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)} />
        <Square value={squares[2]} handleClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)} />
        <Square value={squares[4]} handleClick={() => handleClick(4)} />
        <Square value={squares[5]} handleClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)} />
        <Square value={squares[7]} handleClick={() => handleClick(7)} />
        <Square value={squares[8]} handleClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  return (
    <>
      <Board />
    </>
  );
}

function App() {
  return (
    <>
      <Game />
    </>
  );
}

export default App;
