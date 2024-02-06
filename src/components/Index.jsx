import new_game from "./Calls/new_game";
import rustbu from "./../img/banner.png";
import './../App.css';

const not_yet = () =>{
  alert("coming soon...");
}
  
const Index = () => {
    return ( 
    <div class="Index">
      <img src={rustbu} alt="logo"></img>
      <br/>
    <button onClick={new_game}>New Game</button>
    <button onClick={not_yet}>Play vs Computer</button>
    <br/>
    <br/>
    <br/>
    <a href="https://github.com/Kapsyloffer/RUSTBU" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="git_logo"/></a>
  </div>
    );
  };
  
  export default Index;
  