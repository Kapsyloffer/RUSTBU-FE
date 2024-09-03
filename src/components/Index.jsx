import {new_game_black, new_game_white, new_game_ai, get_game_lobbies} from "./Calls/new_game";
import rustbu from "./../img/banner.png";
import './../App.css';
import NameInput from "./NameInput";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Index = () => {
  //Set player cookie to random String.
  useEffect(() => {
    const existingCookie = Cookies.get("playerID");
    //If there is no cookie, bake a cookie.
    if (!existingCookie || existingCookie === "" || existingCookie === "ChumBucketAI") {
      const randomString = Math.random().toString(36).substring(2, 20);
      Cookies.set("playerID", randomString, { expires: 7 });
    }
  }, []);
    return ( 
    <div className="Index">
      <img src={rustbu} alt="logo" className="w-100"></img>
      <br/>
      <NameInput />
    <br/>
    <button onClick={new_game_black} className="btn-primary">New Game (Black)</button>
    <button onClick={new_game_white} className="btn-primary">New Game (White)</button>
    <button onClick={new_game_ai} className="btn-primary">New Game vs AI <br/>(Unstable + Stupid)</button>
    <button onClick={get_game_lobbies} className="btn-primary">Get Game Lobbies</button>
    {/* Forgive me father for i have sinned. */}
    <br/>
      <a href="/howtoplay">How to Play/Rules</a>
    <br/>
    <br/>

    <a href="/links"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="git_logo" alt="github logo"/></a>
  </div>
    );
  };
  
  export default Index;
  