class GameState{
    constructor(player_b, player_w, boards, turn) {
        this.player_b = player_b;
        this.player_w = player_w;
        this.boards = boards;
        this.turn = turn;
    }

    get_board(h, c){
        for (let b in this.boards){
            if (b.check(c, h)){
                return b;
            }
        }
    }

    get_turn(){
        return this.turn;
    }
}

export default GameState;