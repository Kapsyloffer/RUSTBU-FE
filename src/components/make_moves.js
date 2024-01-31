import ws from "./websocket_connection";

var action_p = null;
var action_a = null;

function make_moves(url, h, b, x1, x2, y1, y2, aggr)
{

    if (aggr === false){
        console.log("You a passive fella");
        action_p = {
        home_colour: h,
        board_colour: b,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        aggr: aggr,
        }
    }else{
        console.log("You an aggressive fella");
        action_a = {
            home_colour: h,
            board_colour: b,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            aggr: aggr,
        };
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
    }
} 

export default make_moves;