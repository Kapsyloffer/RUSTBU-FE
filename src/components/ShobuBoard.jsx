import React, { useState, useEffect, useRef } from 'react';
import fetch_moves from "./Calls/fetch_moves";
import white from "./../img/white_tmp.png";
import black from "./../img/black_tmp.png";
import make_moves from './Calls/make_moves';
let aggr = false;
//Previously selected tile, used for movement.
let prev_row = null;
let prev_col = null;

const ShobuBoard = ({ color, home, url, state}) => {
  const [highlightedTile, setHighlightedTile] = useState(null);
  const boardRef = useRef(null);
  //console.log(home, color);

  const handleClick = async (row, col) => {
    const clickedTile = `${home}-${color}-${row}-${col}`;

    if (highlightedTile && highlightedTile.includes(clickedTile)) {

      make_moves(url, home, color, prev_row, row, prev_col, col, aggr);
      aggr = !aggr;
      console.log(aggr);
      setHighlightedTile(null);
    } else {
      try {
        
        let updatedHighlightedTile = [
          clickedTile
        ];

        prev_row = row;
        prev_col = col;

        //Get possible movement positions
        let moves = await fetch_moves(url, home, color, row, col, aggr);

        //Highlight all possible movement tiles
        moves.map(tuple => {
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
    const boardstate = state.get_board(home, color).state;
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
        switch (boardstate[row][col])
        {
          case "White":
            rock = <img src={white} alt=""/>;
            break;
          case "Black":
            rock = <img src={black} alt=""/>;
            break;
          default:
            break;

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
