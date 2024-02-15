const How2Play = () => {
    return ( 
      <div>
      <h2>How to play:</h2>
      <p>A turn in SHOBU consists of two moves: One "passive" and one "aggressive" move.</p>
      <p>Black goes first.</p>
      <p>The goal of the game is to push all of your opponent's crabs off the edge on one of the four boards.</p>
      <b>Passive move:</b>
      <p>Your passive move, also known as the setup move, is the move which dictates how your aggressive move may look</p>
      <p>You may only do your passive move on one of your homeboards, your homeboards are the boards on your side of the rope.</p>
      <p>You may not push other crabs in your passive move.</p>
      <p>You may only move up to 2 steps with your crab.</p>
      <br />
      <b>Aggressive move:</b>
      <p>Your aggressive move is reliant on your passive move. </p>
      <p>Your aggressive move must move the crab the same amount of steps in the same direction as the passive move.</p>
      <p>Yoy may only do your passive move on a board of the opposite colour of your passive move.</p>
      <p>You may not push 2 crabs at the same time.</p>
    </div>
    );
  };
  
  export default How2Play;
  