import React, { useState, useEffect, useRef } from 'react';
import fetch_moves from "./Calls/fetch_moves";
import white from "./../img/white_ferris.png";
import black from "./../img/black_ferris.png";
import {make_moves} from './Calls/make_moves';
import { get_p, get_coords } from "./Classes/p_made";
import { get_state } from './Global_Values/global_board';

//Previously selected tile, used for movement.
let prev_row = null;
let prev_col = null;
let aggr = false;

const ShobuBoard = ({ color, home, url, player_id}) => {
  const [highlightedTile, setHighlightedTile] = useState(null);
  const [previousMoveTile, setPreviousMoveTile] = useState(null);
  const boardRef = useRef(null);

  const handleClick = async (row, col) => {
    const clickedTile = `${home}-${color}-${row}-${col}`;

    aggr = get_p(); //Holy fuck this is so stupid.

    if (highlightedTile && highlightedTile.includes(clickedTile)) {
        make_moves(url, home, color, prev_row, row, prev_col, col, aggr, player_id);
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
        let moves = await fetch_moves(url, home, color, row, col, aggr, player_id);

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
    const boardstate = get_state().get_board(home, color).state;
    const [[h, c], [x1, y1], [y2, x2]] = get_coords();
    const turn = get_state().get_turn();

    for (let row = 0; row < 4; row++) 
    {
      for (let col = 0; col < 4; col++) 
      {
        //TODO: Break out tiles into own separate component.
        const squareColor = color === 'Black' ? 'dark' : 'light';
        const tileKey = `${home}-${color}-${row}-${col}`;
        const isHighlighted = highlightedTile && highlightedTile.includes(tileKey);
        
        const tileKey_prev_1 = `${h}-${c}-${x1}-${y1}`;
        const tileKey_prev_2 = `${h}-${c}-${y2}-${x2}`; //WHY THE FUCK IS IT FLIPPED

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

        //This is really stupid and crummy but it shows the realtime passive move for the active player.
        //TODO: Write better I guess.
        if (tileKey === tileKey_prev_1 || tileKey === tileKey_prev_2) {
          if (boardstate[row][col] === boardstate[x1][y1])
          {
            if (turn === "Black") {
              rock = <img src={black}  className="ghost"  alt=""/>;
            } else if (turn === "White") {
              rock = <img src={white}  className="ghost"  alt=""/>;
            }
          } else if (boardstate[row][col] === boardstate[y2][x2]) {
            if (turn === "Black") {
              rock = <img src={black}alt=""/>;
            } else if (turn === "White") {
              rock = <img src={white}alt=""/>;
            }
          }
        }

        board.push(
          <div key={tileKey} 
          className={`square ${squareColor} ${aggr ? (isHighlighted ? 'angry_highlighted' : '') : (isHighlighted ? 'highlighted' : '')}`} 
          onClick={() => handleClick(row, col)}>   
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
