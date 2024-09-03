import ws from "./websocket_connection";
import Cookies from "js-cookie";

function new_game_black()
{
  const msg = {
    type: "CreateGame",
    player_id: Cookies.get("playerID"),
    color: "Black",
  };
  ws.send(JSON.stringify(msg));
}

function new_game_white()
{
  const msg = {
    type: "CreateGame",
    player_id: Cookies.get("playerID"),
    color: "White",
  };
  ws.send(JSON.stringify(msg));
}

function new_game_ai()
{
  const msg = {
    type: "CreateGameWithAI",
    player_id: Cookies.get("playerID"),
    color: "Black",
  };
  ws.send(JSON.stringify(msg));
}
function get_game_lobbies()
{
  const msg = {type: "GetAllGames"};
  ws.send(JSON.stringify(msg));
  
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
      if (msg.type === "FetchedLobbies") {
        console.log(msg);
      }
  };
}


export {new_game_black, new_game_white, new_game_ai, get_game_lobbies};