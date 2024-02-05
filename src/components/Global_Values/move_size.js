let dx = 0;
let dy = 0;
let color = null;

function set_size(x, y, c){
    dx = x;
    dy = y;
    color = c;
}

function get_size(){
    return [dx, dy, color];
}

export {set_size, get_size};