import React, { useState, useEffect, useRef } from 'react';
import fetch_moves from "./Calls/fetch_possible_moves";
import white from "./../img/white_ferris.png";
import black from "./../img/black_ferris.png";
import {make_moves} from './Calls/make_moves';
import { get_p, get_coords } from "./Classes/p_made";
import { get_state } from './Global_Values/global_board';
import {get_previous_p, get_previous_a} from "./Global_Values/prev_moves";

//Previously selected tile, used for movement.
let prev_row = null;
let prev_col = null;

const ShobuBoard = ({ color, home, url, player_id}) => {
  const [highlightedTile, setHighlightedTile] = useState(null);
  const boardRef = useRef(null);
  const aggr = get_p(); //Holy fuck this is so stupid.

  const handleClick = async (row, col) => {
    const clickedTile = `${home}-${color}-${row}-${col}`;

    if (highlightedTile && highlightedTile.includes(clickedTile)) {
        make_moves(url, home, color, prev_row, row, prev_col, col, aggr, player_id);
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
        const squareColor = color === 'Black' ? 'dark' : 'light';
        const tileKey = `${home}-${color}-${row}-${col}`;

        const isHighlighted = highlightedTile && highlightedTile.includes(tileKey);
        const hilightClass = `${isHighlighted ? (aggr ?  ('angry_highlighted') : ('highlighted')) : ("")}`;

        const prev_p = check_prev_move_passive(home, color, row, col);
        const prev_a = check_prev_move_aggressive(home, color, row, col);

        const rock = rock_handler(home, color, row, col);

        board.push(
          <div key={tileKey} className={`square ${squareColor} ${hilightClass} ${prev_p}${prev_a}`} onClick={() => handleClick(row, col)}>   
            {rock}
          </div>
        );
      }
    }
    return board;
  };

  return <div className="board" ref={boardRef}>{renderShobuBoard()}</div>;
};

function rock_handler(home, color, row, col){
  const boardstate = get_state().get_board(home, color).state;
  const [[h, c], [x1, y1], [x2, y2]] = get_coords();
  const turn = get_state().get_turn();

  const tileKey = `${home}-${color}-${row}-${col}`;
  const tileKey_prev_1 = `${h}-${c}-${x1}-${y1}`;
  const tileKey_prev_2 = `${h}-${c}-${x2}-${y2}`; 

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
      rock = null;
      break;
  }

  //Checks if a passive move has been made previously.
  if (tileKey === tileKey_prev_1 || tileKey === tileKey_prev_2) {
    if (boardstate[row][col] === boardstate[x1][y1]) { //Previous position
      if (turn === "Black") {
        rock = <img src={black}  className="ghost"  alt=""/>;
      } else if (turn === "White") {
        rock = <img src={white}  className="ghost"  alt=""/>;
      }
    } else if (boardstate[row][col] === boardstate[x2][y2]) { //Next position
      if (turn === "Black") {
        rock = <img src={black}alt=""/>;
      } else if (turn === "White") {
        rock = <img src={white}alt=""/>;
      }
    }
  }

  return rock;
}


function check_prev_move_passive(home, color, row, col){
  const prev_p = get_previous_p();
  if(prev_p.home_colour === home 
    && prev_p.board_colour === color
    && (prev_p.x1 === row
    && prev_p.y1 === col 
    || prev_p.x2 === row 
    && prev_p.y2 === col))
  {
    return "prev_passive";
  }
  return "";
}

function check_prev_move_aggressive(home, color, row, col){
  const prev_a = get_previous_a();
  if(prev_a.home_colour === home 
    && prev_a.board_colour === color
    && (prev_a.x1 === row
    && prev_a.y1 === col 
    || prev_a.x2 === row 
    && prev_a.y2 === col))
  {
    return "prev_aggressive";
  }
  return "";
}

export default ShobuBoard;
