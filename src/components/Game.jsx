import React, { useEffect, useState } from 'react';
import ShobuBoard from './ShobuBoard';
import ropeImage from './../img/rop.png';
import { useParams } from 'react-router-dom';
import fetch_state from './Calls/fetch_state';
import Cookies from 'js-cookie';

const Game = () => {
  const { game_id } = useParams();
  const [gamestate, setGamestate] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 


  //Fetch game data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetch_state(game_id);
        setGamestate(result);
        console.log(result);
      } catch (error) {
        console.log('Error fetching game state:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [game_id]);

//Set player cookie to random String.
  useEffect(() => {
    const existingCookie = Cookies.get("playerID");
    console.log(existingCookie);
    if (!existingCookie) {
      const randomString = Math.random().toString(36).substring(2, 20);
      Cookies.set("playerID", randomString, { expires: 7 });
    }
  }, []);

//Fetch rockvision(TM) for the white player
useEffect(() => {
  if (true) {
    import('./../white.css').then(() => {
      console.log('CSS file imported successfully!');
    }).catch(error => {
      console.error('Error importing CSS file:', error);
    });
  }
}, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="infotxt">
    <span>You are: {Cookies.get("playerID")}</span><br/>
    <span>PlayerB: {gamestate.player_b}</span><br/>
    <span>PlayerW: {gamestate.player_w}</span><br/>
    <span>Turn:    {gamestate.turn}</span>
    <div className="bruh">
      <div className="SHOBU-container">
        <ShobuBoard color="Black" home="White" url={game_id} state={gamestate}/>
        <ShobuBoard color="White" home="White" url={game_id} state={gamestate}/>
      </div>

      <img src={ropeImage} alt="Rope" />

      <div className="SHOBU-container">
        <ShobuBoard color="White" home="Black" url={game_id} state={gamestate}/>
        <ShobuBoard color="Black" home="Black" url={game_id} state={gamestate}/>
      </div>
    </div>
    </div>
  );
};

export default Game;
