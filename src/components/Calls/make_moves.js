import ws from "./websocket_connection";
import {set_p} from "./p_made";
import { set_state, get_state } from "../Global_Values/global_board";


var action_p = null;
var action_a = null;

function make_moves(url, h, b, x1, x2, y1, y2, aggr)
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
        }
        set_p(true);
    }else{
        action_a = {
        home_colour: h,
        board_colour: b,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        aggr: aggr,
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
    }
} 
export {make_moves, action_p};