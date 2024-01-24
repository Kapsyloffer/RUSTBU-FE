import React from 'react';
import './App.css';
import ShobuBoard from './components/ShobuBoard';
import ropeImage from './img/rop.png'; 

function App() {
  return (
    <div className="App">
      <div className="bruh">
        <div className="SHOBU-container">
          <ShobuBoard color="Black" home="White" />
          <ShobuBoard color="White" home="White" />
        </div>
        
        <img src={ropeImage} alt="Rope" />

        <div className="SHOBU-container">
          <ShobuBoard color="White" home="Black" />
          <ShobuBoard color="Black" home="Black" />
        </div>
      </div>
    </div>
  );
}

export default App;
