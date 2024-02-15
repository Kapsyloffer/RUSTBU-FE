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


export {new_game_black, new_game_white};