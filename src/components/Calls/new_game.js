import ws from "./websocket_connection";

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

export default new_game;