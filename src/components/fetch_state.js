const ws = new WebSocket("ws://localhost:4444/ws");

async function fetch_state(url) 
{
  /*return new Promise((resolve, reject) => 
  {*/
      const packet = {
          type: "FetchGame",
          url: url,
      };

      ws.send(JSON.stringify(packet));

      ws.onmessage = (event) => 
      {
          const msg = JSON.parse(event.data);
          if (msg.type === "FetchedGame") 
          {
              console.log(msg.state);
              //resolve(null);
          }
      };

      // Handle errors or timeouts
      ws.onerror = (error) => {
          //reject(error);
      };
  //});
}

ws.onerror = (event) => {
  console.error('WebSocket error:', event);
};

ws.onclose = (event) => {
  console.log('WebSocket closed:', event);
};
  
export default fetch_state;