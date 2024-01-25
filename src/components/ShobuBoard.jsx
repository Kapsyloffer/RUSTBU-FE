import React, { useState, useEffect, useRef } from 'react';
import fetch_moves from "./fetch_moves";

const ShobuBoard = ({ color, home }) => {
  const [highlightedTile, setHighlightedTile] = useState(null);
  const boardRef = useRef(null);

  const handleClick = async (row, col) => {
    const clickedTile = `${home}-${color}-${row}-${col}`;

    if (highlightedTile && highlightedTile.includes(clickedTile)) {
      setHighlightedTile(null);
    } else {
      try {
        
        let updatedHighlightedTile = [
          clickedTile,
        ];

        let moves = await fetch_moves(null, home, color, row, col, true);
        console.log(moves);
        console.log(Array.isArray(moves));
        const m = moves.map(tuple => {
          const [x, y] = tuple;
          updatedHighlightedTile.push(`${home}-${color}-${x}-${y}`)
          return { x, y };
        });

        setHighlightedTile(updatedHighlightedTile);
      } catch (error) {
        console.error("Error fetching moves:", error);
        // Handle errors here
      }
    }
  };

  const handleFocusLost = (event) => {
    if (boardRef.current && !boardRef.current.contains(event.target)) {
      setHighlightedTile(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleFocusLost);

    return () => {
      document.removeEventListener('click', handleFocusLost);
    };
  }, []);

  const renderShobuBoard = () => {
    const board = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const squareColor = color === 'Black' ? 'dark' : 'light';
        const tileKey = `${home}-${color}-${row}-${col}`;
        const isHighlighted = highlightedTile && highlightedTile.includes(tileKey);

        board.push(
          <div key={tileKey} className={`square ${squareColor} ${isHighlighted ? 'highlighted' : ''}`} onClick={() => handleClick(row, col)}>
            {isHighlighted && <div className="green-dot"></div>}
          </div>
        );
      }
    }
    return board;
  };

  return <div className="board" ref={boardRef}>{renderShobuBoard()}</div>;
};

export default ShobuBoard;
