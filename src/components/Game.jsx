import React, { useEffect, useState } from "react";
import ShobuBoard from "./ShobuBoard";
import ropeImage from "./../img/rop.png";
import { useParams } from "react-router-dom";
import fetch_state from "./Calls/fetch_state";
import Cookies from "js-cookie";
import join_game from "./Calls/join_game";
import { set_state, get_state } from './Global_Values/global_board';

const Game = () => {
  const { game_id } = useParams();
  const [isLoading, setIsLoading] = useState(true); 
  const [timedOut, setTimedOut] = useState(false); 

  // Fetch game data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setTimedOut(true);
        }, 5000);
  
        let fetched = await fetch_state(game_id);
  
        if (get_state().get_turn() === fetched.get_turn()) {
          return;
        } else {
          set_state(fetched);
          //console.log(get_state());
        }
      } catch (error) {
        console.log("Error fetching game state:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Initial fetch
    fetchData();
  
    // Fetch at intervals if the current player is not the active player
    if (get_state().who_am_i(Cookies.get("playerID") === get_state().get_turn())) {
      const intervalId = setInterval(fetchData, 500);
  
      return () => {
        clearInterval(intervalId); // Cleanup the interval when the component unmounts
      };
    }
  }, [game_id]);
  

  
//Set player cookie to random String.
  useEffect(() => {
    const existingCookie = Cookies.get("playerID");
    //console.log(existingCookie);
    if (!existingCookie) {
      const randomString = Math.random().toString(36).substring(2, 20);
      Cookies.set("playerID", randomString, { expires: 7 });
    }
  }, []);


  const player_id = Cookies.get("playerID");

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
  join_game(game_id, Cookies.get("playerID"));
  window.location.reload();
}

const has_joined = () =>
{
  return (
    (Cookies.get("playerID") === get_state().get_player("b") || 
    Cookies.get("playerID") === get_state().get_player("w")) || 
    (get_state().get_player("b") !== "None" && get_state().get_player("w") !== "None")
    );
}

//Fancy schmancy loading
const [loadingDots, setLoadingDots] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingDots((prevDots) => (prevDots % 3) + 1);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const loadingText = "Loading" + ".".repeat(loadingDots);
  
  if (isLoading && !timedOut) {
    return <div>{loadingText}</div>;
  }

  if(timedOut && isLoading){
    return <div><p>The game you're looking for does not exist.</p> <a href="/">Return.</a></div>;
  }

  return (
    <div className="infotxt">
      <span>You are: {Cookies.get("playerID")}</span><br/>
      <span>PlayerB: {get_state().get_player("b")}</span><br/>
      <span>PlayerW: {get_state().get_player("w")}</span><br/>
      <span>Turn:    {get_state().get_turn()}</span><br/>
      {!has_joined() ? (<button onClick={join}>Join game</button>) : null}
      <span>DORK Flip:    <input type="checkbox" checked={flipped} onChange={toggleFlip} /></span>
      <span>White:   <input type="checkbox" checked={white} onChange={toggleWhite} /></span>
  
      <div className={`bruh ${white ? "white" : ""}`}>
        <div className="SHOBU-container">
          <ShobuBoard color="Black" home="White" url={game_id} player_id={player_id}/>
          <ShobuBoard color="White" home="White" url={game_id} player_id={player_id}/>
        </div>
  
        <img src={ropeImage} alt="Rope" />
  
        <div className="SHOBU-container">
          {!flipped ? (
            <>
              <ShobuBoard color="Black" home="Black" url={game_id} player_id={player_id}/>
              <ShobuBoard color="White" home="Black" url={game_id} player_id={player_id}/>
            </>
          ) : (
            <>
              <ShobuBoard color="White" home="Black" url={game_id} player_id={player_id}/>
              <ShobuBoard color="Black" home="Black" url={game_id} player_id={player_id}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}  

export default Game;
