import {set_state} from "./../Global_Values/global_board";
import parse_game from "./parse_game";

const ws = new WebSocket("ws://83.209.179.124:4444/ws");


ws.onopen = () => {
    console.log("We're open for business");      
};

ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
        if (msg.type === "FetchedGame") {
            try{
            const parsed = parse_game(msg.state);
            set_state(parsed);
        }catch{

        }    
    }
}

ws.onerror = (event) => {
    console.error('WebSocket error:', event);
};

ws.onclose = (event) => {
    console.log('WebSocket closed:', event);
};

export default ws;