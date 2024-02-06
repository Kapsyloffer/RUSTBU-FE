import ws from "./websocket_connection";
import { get_size } from "./../Global_Values/move_size";

async function fetch_moves(url, h, b, x, y, aggr, player_id) {
  return new Promise((resolve, reject) => {
    const packet = {
      type: "FetchMoves",
      url: url,
      h: h,
      c: b,
      x: x,
      y: y,
      aggr: aggr,
      player: player_id,
    };

    ws.send(JSON.stringify(packet));

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "FetchedMoves") {
        let parsed = parse_moves(msg.moves);

        if (!aggr) {
          resolve(parsed);
        } else if (aggr) {
          resolve(check_aggr_move(packet));
        }
        resolve([]);
        
      };
    };

    ws.onerror = (error) => {
      reject(error);
    };
  });
}

function parse_moves(msg)
{
  const tuples = msg.match(/\(\d+,\s*\d+\)/g);

  if (Array.isArray(tuples)) {
    const moves = tuples.map(tuple => {
      const [x, y] = tuple.match(/\d+/g).map(Number);
      return [x, y];
    });

    return moves;
  } else {
    //console.error('Error: Tuples not found in the string');
    return [];
  }
}

function check_aggr_move(packet){
  let [dx, dy, dc] = get_size();

  if(dc !== packet.c){
    return [[(packet.x - dx), (packet.y - dy)]]; //This is stupid
  }
  return [];
}
  
export default fetch_moves;