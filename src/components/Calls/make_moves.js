import ws from "./websocket_connection";
import {set_p, set_coords} from "../Classes/p_made";
import { set_state } from "../Global_Values/global_board";
import fetch_state from "./fetch_state";
import {get_size, set_size} from "./../Global_Values/move_size";
import fetch_previous_moves from "./fetch_previous_moves";


var action_p = null;
var action_a = null;

async function make_moves(url, h, b, x1, x2, y1, y2, aggr, player_id)
{
    if (aggr === false){
        action_p = {
        home_colour: h,
        board_colour: b,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        aggr: aggr,
        player: player_id,
        }
        if(!(x1 === x2 && y1 === y2))
        {
            set_p(true);
            set_coords(h, b, x1, y1, x2, y2); 
            set_size((x1 - x2), (y1 - y2), action_p.board_colour);
            console.log(get_size());  
        }
    }else{
        action_a = {
        home_colour: h,
        board_colour: b,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        aggr: aggr,
        player: player_id,
        }
    }

    if (action_p !== null && action_a !== null){
    const packet = {
        type: "Action",
        url: url,
        move_p: action_p,
        move_a: action_a
    };
    ws.send(JSON.stringify(packet));
    action_p = null;
    action_a = null;
    set_p(false);
    set_coords(null, null, null, null, null, null);
    set_state(await fetch_state(url));
    fetch_previous_moves(url);
    }
} 
export {make_moves, action_p};