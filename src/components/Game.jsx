import React from 'react';
import ShobuBoard from './ShobuBoard'; // Make sure to provide the correct path
import ropeImage from './../img/rop.png'; 
import {useParams } from 'react-router-dom';
import fetch_state from './Calls/fetch_state';

const Game = () => {
  const { game_id } = useParams();
  console.log(game_id);
  let gamestate= fetch_state(game_id);
  console.log(gamestate);
  return (
    <div className="bruh">
      <div className="SHOBU-container">
        <ShobuBoard color="Black" home="White" url={game_id}/>
        <ShobuBoard color="White" home="White" url={game_id}/>
      </div>

      <img src={ropeImage} alt="Rope" />

      <div className="SHOBU-container">
        <ShobuBoard color="White" home="Black" url={game_id}/>
        <ShobuBoard color="Black" home="Black" url={game_id}/>
      </div>
    </div>
  );
};

export default Game;
