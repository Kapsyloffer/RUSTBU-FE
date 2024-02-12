import React, { useEffect, useState } from "react";
import ShobuBoard from "./ShobuBoard";
import ropeImage from "./../img/rop.png";
import { useParams } from "react-router-dom";
import fetch_state from "./Calls/fetch_state";
import Cookies from "js-cookie";
import join_game from "./Calls/join_game";
import { set_state, get_state } from './Global_Values/global_board';
import fetch_previous_moves from "./Calls/fetch_previous_moves";
import logo from "./../img/RUSTBU.png";
import Joever from "./Joever";
import Winner from "./Winner";

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
        await fetch_previous_moves(game_id);
        if (get_state().get_turn() === fetched.get_turn() && is_full()) {
          return;
        } else {
          set_state(fetched);
        }
      } catch (error) {
        console.log("Error fetching game state:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    // Initial fetch
    fetchData();
  
    //TODO: Remove this caveman solution.
    // Fetch at intervals if the current player is not the active player
    const intervalId = setInterval(fetchData, 1500);

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, [game_id]);
  
  const has_winner = () =>{
    return (get_state().get_winner() !== "Empty");
  }
  
  //Set player cookie to random String.
  useEffect(() => {
    const existingCookie = Cookies.get("playerID");
    //If there is no cookie, bake a cookie.
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

  const is_full = () =>
  {
    return (get_state().get_player("b") !== "None" && get_state().get_player("w") !== "None")
  }

  const has_joined = () =>
  {
    return ((Cookies.get("playerID") === get_state().get_player("b") 
    || Cookies.get("playerID") === get_state().get_player("w")));
  }

  const did_i_win = () =>
  {
    if (get_state().get_winner() === get_state().who_am_i(Cookies.get("playerID"))) {
      return true;
    } else if (get_state().who_am_i(Cookies.get("playerID")) !== "Spectator") {
      return false;
    }
  }

  useEffect(() => {
    if(get_state().get_player("w") === Cookies.get("playerID") || get_state().get_player("b") === Cookies.get("playerID"))
    {
      setWhite(Cookies.get("playerID") === get_state().get_player("w"));
    }
  })

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
    <div className="p-3">
      <div className="infotxt">
        <div>
        <span>⬤  <b>{get_state().get_player("b")}</b></span><br/>
        <span>○ <b>{get_state().get_player("w")}</b></span><br/>
        <span>Turn:    {get_state().get_turn()}</span><br/>
        <span> {has_winner() ? `Has Winner: ${get_state().get_winner()}` : ""}</span><br/>
        {!has_joined() && !is_full() ? (<button onClick={join}>Join game</button>) : null}
        <span>DORK Flip:    <input type="checkbox" checked={flipped} onChange={toggleFlip} /></span>
        {!has_joined() ? (<span>White:   <input type="checkbox" checked={white} onChange={toggleWhite} /></span>) : null}
        </div>
        <div>
        </div>
      </div>
      <section className={`game-container ${white ? "white" : ""}`}>
        <div className="SHOBU-container">
          <ShobuBoard color="Black" home="White" url={game_id} player_id={player_id}/>
          <ShobuBoard color="White" home="White" url={game_id} player_id={player_id}/>
        </div>
  
        <img src={ropeImage} alt="Rope" className="rope"/>
  
        <div className="SHOBU-container">
          <ShobuBoard color={!flipped ? "Black" : "White"} home="Black" url={game_id} player_id={player_id}/>
          <ShobuBoard color={!flipped ? "White" : "Black"} home="Black" url={game_id} player_id={player_id}/>
        </div>
      </section><br></br>
    {has_winner() && has_joined() ? (did_i_win() ? <Winner/> : <Joever/>) : ""}
    </div>
  );
}  

export default Game;
