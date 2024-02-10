import new_game from "./Calls/new_game";
import rustbu from "./../img/banner.png";
import './../App.css';
import { useEffect } from "react";
import Cookies from "js-cookie";

const set_name = () =>{
  const username = document.getElementById("name").value;
  Cookies.set("playerID", username, { expires: 7 });
  alert("Your name is now: " + Cookies.get("playerID"));
}
  
const Index = () => {
  useEffect(() =>{
    let name =  Cookies.get("playerID");
    document.getElementById("name").value = name;
  })
    return ( 
    <div className="Index">
      <img src={rustbu} alt="logo" className="w-100"></img>
      <br/>
    <input type="text" placeholder="Username" id="name"></input>
    <button onClick={set_name} className="btn-primary">Set username</button>
    <br/>
    <button onClick={new_game} className="btn-primary">New Game</button>

    <a href="https://github.com/Kapsyloffer/RUSTBU" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="git_logo" alt="github logo"/></a>
  </div>
    );
  };
  
  export default Index;
  