const ws = new WebSocket("ws://83.209.179.124:4444/ws");


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