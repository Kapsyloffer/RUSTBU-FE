import ws from "./websocket_connection";
import parse_game from "./parse_game";

async function fetch_state(url) {
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
        type: "FetchGame",
        url: url,
      };

      ws.send(JSON.stringify(packet));

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "FetchedGame") {
          try {
            const parsed = parse_game(msg.state);
            resolve(parsed);
          } catch (error) {
            reject(error);
          }
        }
      };

      // Handle errors or timeouts
      ws.onerror = (error) => {
        reject(error);
      };
    }
  });
}

export default fetch_state;
