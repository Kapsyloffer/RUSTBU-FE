import new_game from "./Calls/new_game";
import rustbu from "./../img/banner.png";
import './../App.css';
  
const Index = () => {
    return ( 
    <div class="Index">
      <img src={rustbu} alt="logo"></img>
      <br/>
    <button onClick={new_game}>New Game</button>
  </div>
    );
  };
  
  export default Index;
  