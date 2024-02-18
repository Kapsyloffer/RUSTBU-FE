const How2Play = () => {
    return ( 
      <div className="tutorial-txt">
      <h1>How to play:</h1>
      <p>A turn in SHOBU consists of two moves: <br/>A <b>"passive"</b> move, and an <b>"aggressive"</b> move.</p>
      <p>Black goes first.</p>
      <p>The goal of the game is to push all of your opponent's crabs off the edge on one of the four boards.</p>
      <p>If you lose all of your crabs on any one board, then you've lost the game.</p>
      <br/>
      <h2>Passive move:</h2>
      <p>* Your passive move, also known as the setup move, is the move which dictates how your aggressive move may look</p>
      <p>* You may only do your passive move on one of your homeboards, your homeboards are the boards on your side of the rope.</p>
      <p>* You may not push other crabs in your passive move.</p>
      <p>* You may only move up to 2 steps with your crab.</p>
      <br />
      <h2>Aggressive move:</h2>
      <p>* Your aggressive move is reliant on your passive move. </p>
      <p>* Your aggressive move must move the crab the same amount of steps in the same direction as the passive move.</p>
      <p>* You may only do your passive move on a board of the opposite colour of your passive move.</p>
      <p>* You may not push your own crabs.</p>
      <p>* You may not push 2 crabs at the same time.</p>
      <br/>
      <a href="/">Return.</a>
    </div>
    );
  };
  
  export default How2Play;
  