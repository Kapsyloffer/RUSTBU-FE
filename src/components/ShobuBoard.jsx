import React, { useState, useEffect, useRef } from 'react';

const ShobuBoard = ({ color, home }) => {
  const [highlightedTile, setHighlightedTile] = useState(null);
  const boardRef = useRef(null);

  const handleClick = (row, col) => {
    const clickedTile = `${home}-${color}-${row}-${col}`;

    if (highlightedTile && highlightedTile.includes(clickedTile)) {
      setHighlightedTile(null);
    } else {
      const updatedHighlightedTile = [
        clickedTile,
        `${home}-${color}-${row - 1}-${col}`,
        `${home}-${color}-${row + 1}-${col}`,
        `${home}-${color}-${row}-${col - 1}`,
        `${home}-${color}-${row}-${col + 1}`,
        //TODO: FETCH MOVES USING WEBSOCKETS
      ];

      setHighlightedTile(updatedHighlightedTile);
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
