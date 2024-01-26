const ws = new WebSocket("ws://localhost:4444/ws");
  let current_game = null;

  function new_game()
  {
    const msg = {
      type: "CreateGame",
    };
    ws.send(JSON.stringify(msg));
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if(msg.type === "GameCreated") {
      console.log(msg.url);
      window.location.href = `./game/${msg.url}`;
    }
  }

  
const Index = () => {
    return ( 
    <div className="Index">
    <button onClick={new_game}>New Game</button>
  </div>
    );
  };
  
  export default Index;
  