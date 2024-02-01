import ws from "./websocket_connection";
import GameState from "./../Classes/GameState";
import Board from "./../Classes/Board";

async function fetch_state(url) {
  return new Promise((resolve, reject) => {
    ws.onopen = () => {
      const packet = {
        type: "FetchGame",
        url: url,
      };

      ws.send(JSON.stringify(packet));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "FetchedGame") {
        let parsed = parse_game(msg.state);
        //console.log(msg.state);
        resolve(parsed);
      }
    };

    // Handle errors or timeouts
    ws.onerror = (error) => {
      reject(error);
    };
  });
}

function parse_game(input)
{
    const boardRegex = /Board \{ color: (\w+), home: (\w+), state: \[\[([\w,\s]+)\], \[([\w,\s]+)\], \[([\w,\s]+)\], \[([\w,\s]+)\]\] \}/g;
    const gameRegex = /Game \{ player_b: (\w+), player_w: (\w+), boards: \[([\s\S]+?)\], turn: (\w+) \}/;

    const gameMatch = input.match(gameRegex);

    if (!gameMatch) {
        throw new Error('Invalid input format');
    }

    const player_b = gameMatch[1];
    const player_w = gameMatch[2];
    const boardMatches = gameMatch[3].matchAll(boardRegex);
    const boards = [];

    for (const match of boardMatches) {
        const color = match[1];
        const home = match[2];
        const state = [
            match[3].split(', ').map(cell => cell.trim()),
            match[4].split(', ').map(cell => cell.trim()),
            match[5].split(', ').map(cell => cell.trim()),
            match[6].split(', ').map(cell => cell.trim())
        ];
        var b = new Board(color, home, state)
        //console.log(b);
        boards.push(b);
    }

    const turn = gameMatch[4];

    return new GameState(player_b, player_w, boards, turn);
}

export default fetch_state;
