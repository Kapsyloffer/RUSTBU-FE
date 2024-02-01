import ws from "./websocket_connection";

async function fetch_moves(url, h, b, x, y, aggr) 
{
  return new Promise((resolve, reject) => 
  {
      const packet = {
          type: "FetchMoves",
          url: url,
          h: h,
          c: b,
          x: x,
          y: y,
          aggr: aggr
      };

      ws.send(JSON.stringify(packet));

      ws.onmessage = (event) => 
      {
          const msg = JSON.parse(event.data);
          if (msg.type === "FetchedMoves") 
          {
              let parsed = parse_moves(msg.moves);
              //console.log(typeof msg.moves);
              resolve(parsed);
          }
      };

      // Handle errors or timeouts
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
    console.error('Error: Tuples not found in the string');
    return [];
  }
}
  
export default fetch_moves;