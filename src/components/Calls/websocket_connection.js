const ws = new WebSocket("ws://localhost:4444/ws");


ws.onopen = () => {
    console.log("We're open for business");      
};


ws.onerror = (event) => {
    console.error('WebSocket error:', event);
};

ws.onclose = (event) => {
    console.log('WebSocket closed:', event);
};

export default ws;