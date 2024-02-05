import React, { useEffect, useState } from "react";
import ShobuBoard from "./ShobuBoard";
import ropeImage from "./../img/rop.png";
import { useParams } from "react-router-dom";
import fetch_state from "./Calls/fetch_state";
import Cookies from "js-cookie";
import join_game from "./Calls/join_game";

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
        console.log("Error fetching game state:", error);
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



//Flipped board display check
const [flipped, setFlipped] = useState(Cookies.get("flipped") === "true");
const [white, setWhite] = useState(Cookies.get("white") === "true");

const toggleFlip = () => {
  const newFlipped = !flipped;
  setFlipped(newFlipped);
  Cookies.set("flipped", newFlipped, { expires: 7 }); // Update the cookie value
};

const toggleWhite  = () => {
  const newWhite = !white;
  setWhite(newWhite);
  Cookies.set("white", newWhite, { expires: 7 }); // Update the cookie value
};

const join = async() => {
  await join_game(game_id, Cookies.get("playerID"));
}

const has_joined = () =>
{
  return (
    (Cookies.get("playerID") === gamestate.player_b || 
    Cookies.get("playerID") === gamestate.player_w) || 
    (gamestate.player_b !== "None" && gamestate.player_w !== "None")
    );
}

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="infotxt">
      <span>You are: {Cookies.get("playerID")}</span><br/>
      <span>PlayerB: {gamestate.player_b}</span><br/>
      <span>PlayerW: {gamestate.player_w}</span><br/>
      <span>Turn:    {gamestate.turn}</span><br/>
      {!has_joined() ? (<button onClick={join}>Join game</button>) : null}
      <span>DORK Flip:    <input type="checkbox" checked={flipped} onChange={toggleFlip} /></span>
      <span>White:   <input type="checkbox" checked={white} onChange={toggleWhite} /></span>
  
      <div className={`bruh ${white ? "white" : ""}`}>
        <div className="SHOBU-container">
          <ShobuBoard color="Black" home="White" url={game_id} state={gamestate}/>
          <ShobuBoard color="White" home="White" url={game_id} state={gamestate}/>
        </div>
  
        <img src={ropeImage} alt="Rope" />
  
        <div className="SHOBU-container">
          {!flipped ? (
            <>
              <ShobuBoard color="Black" home="Black" url={game_id} state={gamestate} />
              <ShobuBoard color="White" home="Black" url={game_id} state={gamestate} />
            </>
          ) : (
            <>
              <ShobuBoard color="White" home="Black" url={game_id} state={gamestate} />
              <ShobuBoard color="Black" home="Black" url={game_id} state={gamestate} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}  

export default Game;
