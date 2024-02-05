let dx = 0;
let dy = 0;

function set_size(x, y){
    dx = x;
    dy = y;
}

function get_size(){
    return [dx, dy];
}

export {set_size, get_size};