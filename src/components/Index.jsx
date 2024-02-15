import {new_game_black, new_game_white} from "./Calls/new_game";
import rustbu from "./../img/banner.png";
import './../App.css';
import NameInput from "./NameInput";

const Index = () => {
    return ( 
    <div className="Index">
      <img src={rustbu} alt="logo" className="w-100"></img>
      <br/>
      <NameInput />
    <br/>
    <button onClick={new_game_black} className="btn-primary">New Game (Black)</button>
    <button onClick={new_game_white} className="btn-primary">New Game (White)</button>
    {/* Forgive me father for i have sinned. */}
    <br/>
    <br/>
    <br/>

    <a href="https://github.com/Kapsyloffer/RUSTBU" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="git_logo" alt="github logo"/></a>
  </div>
    );
  };
  
  export default Index;
  