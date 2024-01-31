import ws from "./websocket_connection";

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
        console.log(msg.state);
        resolve(null);
      }
    };

    // Handle errors or timeouts
    ws.onerror = (error) => {
      reject(error);
    };
  });
}

export default fetch_state;