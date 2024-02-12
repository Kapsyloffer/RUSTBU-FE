//THIS ENTIRE THING IS FUCKED. TODO: NUKE, ANNIHILATE, IDK, FIX.

let p_made = false;
let h = "";
let c = "";
let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;

function set_p(v){
    p_made = v;
}

function get_coords(){
    return [[h, c], [x1, y1], [x2, y2]];
}

function set_coords(new_h, new_c, new_x1, new_y1, new_x2, new_y2) {
    h = new_h;
    c = new_c;

    x1 = new_x1;
    y1 = new_y1;

    x2 = new_x2;
    y2 = new_y2;

    console.log("set coords: ", [[h, c], [x1, y1], [x2, y2]]);
}

function get_p(){
    return p_made;
}

export {get_p, set_p, get_coords, set_coords};