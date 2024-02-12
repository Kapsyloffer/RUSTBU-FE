import ws from "./websocket_connection";
import {set_prev_values} from "./../Global_Values/prev_moves";

async function fetch_previous_moves(url){

const packet = {
    type: "FetchPreviousMoves",
    url: url,
};
ws.send(JSON.stringify(packet));  

ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "PreviousMoves") {
        set_prev_values(msg.move_p, msg.move_a);
    }
  };
}

export default fetch_previous_moves;