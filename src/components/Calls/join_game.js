import ws from "./websocket_connection";

async function join_game(url, id) {
  return new Promise((resolve, reject) => {
    if (ws.readyState === WebSocket.OPEN) {
      sendFetchRequest();
    } else {
      ws.addEventListener("open", () => {
        sendFetchRequest();
      });
    }

    function sendFetchRequest() {
      const packet = {
        type: "JoinGame",
        url: url,
        player_id: id,
      };

      ws.send(JSON.stringify(packet));

      // Handle errors or timeouts
      ws.onerror = (error) => {
        reject(error);
      };
    }
  });
}

export default join_game;
