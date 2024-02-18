const ws = new WebSocket("ws://16.171.250.93:4444/ws");


ws.onopen = () => {
    console.log("We're open for business");      
};

ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if(msg.type === "GameCreated") {
      //console.log(msg.url);
      window.location.href = `./game/${msg.url}`;
    }
  }

ws.onerror = (event) => {
    console.error('WebSocket error:', event);
};

ws.onclose = (event) => {
    console.log('WebSocket closed:', event);
};

export default ws;