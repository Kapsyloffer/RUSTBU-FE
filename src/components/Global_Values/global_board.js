import GameState from "./../Classes/GameState";

var gameboard = new GameState();

function set_state(v){
    gameboard = v;
}

function get_state(){
    return gameboard;
}

export {set_state, get_state};