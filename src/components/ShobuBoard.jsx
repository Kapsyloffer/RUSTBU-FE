import React, { useState, useEffect, useRef } from 'react';
import fetch_moves from "./fetch_moves";
import white from "./../img/white_tmp.png";
import black from "./../img/black_tmp.png";

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
          clickedTile
        ];

        //Get possible movement positions
        let moves = await fetch_moves(null, home, color, row, col, true);

        //Highlight all possible movement tiles
        const m = moves.map(tuple => {
          const [x, y] = tuple;
          updatedHighlightedTile.push(`${home}-${color}-${x}-${y}`)
          return { x, y };
        });

        //Highlight them; TODO: Make better?
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
    for (let row = 0; row < 4; row++) 
    {
      for (let col = 0; col < 4; col++) 
      {
        //TODO: Break out tiles into own separate component.
        const squareColor = color === 'Black' ? 'dark' : 'light';
        const tileKey = `${home}-${color}-${row}-${col}`;
        const isHighlighted = highlightedTile && highlightedTile.includes(tileKey);

        //Temp rock render solution
        //TODO: Fetch positions and render.
        let rock = null;
        if (row === 0) 
        {
          rock = <img src={white} />;
        } 
        else if (row === 3) 
        {
          rock = <img src={black} />;
        }

        board.push(
          <div key={tileKey} className={`square ${squareColor} ${isHighlighted ? 'highlighted' : ''}`} onClick={() => handleClick(row, col)}>
            
            {rock}
          </div>
        );
      }
    }
    return board;
  };

  return <div className="board" ref={boardRef}>{renderShobuBoard()}</div>;
};

export default ShobuBoard;
