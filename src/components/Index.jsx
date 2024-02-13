import new_game from "./Calls/new_game";
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
    <button onClick={new_game} className="btn-primary">New Game</button>

    <a href="https://github.com/Kapsyloffer/RUSTBU" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="git_logo" alt="github logo"/></a>
  </div>
    );
  };
  
  export default Index;
  