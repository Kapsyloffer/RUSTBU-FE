import React from 'react';
import ShobuBoard from './ShobuBoard'; // Make sure to provide the correct path
import ropeImage from './../img/rop.png'; 

const Game = () => {
  return (
    <div className="bruh">
      <div className="SHOBU-container">
        <ShobuBoard color="Black" home="White" />
        <ShobuBoard color="White" home="White" />
      </div>

      <img src={ropeImage} alt="Rope" />

      <div className="SHOBU-container">
        <ShobuBoard color="White" home="Black" />
        <ShobuBoard color="Black" home="Black" />
      </div>
    </div>
  );
};

export default Game;
