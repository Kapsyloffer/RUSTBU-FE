let previous_p = {
    aggr: null,
    home_colour: null,
    board_colour: null,
    player: null,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
};

let previous_a = {
    aggr: null,
    home_colour: null,
    board_colour: null,
    player: null,
    x1: null,
    x2: null,
    y1: null,
    y2: null,
}

function set_prev_values(new_p, new_a){
    previous_p = new_p;
    previous_a = new_a;
}

function get_previous_p(){
    return previous_p;
}

function get_previous_a(){
    return previous_a;
}


export {set_prev_values, get_previous_p, get_previous_a};