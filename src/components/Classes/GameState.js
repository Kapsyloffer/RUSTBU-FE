class GameState{
    constructor(player_b, player_w, boards, turn, winner) {
        this.player_b = player_b;
        this.player_w = player_w;
        this.boards = boards;
        this.turn = turn;
        this.winner = winner;
    }

    get_board(h, c){
        for (let b of this.boards){
            if (b.check(c, h)){
                return b;
            }
        }
    }

    get_player(v){
        if (v === "b"){
            return this.player_b;
        }
        if (v === "w"){
            return this.player_w;
        }
        return null;
    }

    get_turn(){
        return this.turn;
    }

    get_winner(){
        return this.winner;
    }

    who_am_i(cookie){
        switch(cookie){
            case this.player_b:
                return "Black";
            case this.player_w:
                return "White";
            default:
                return "Spectator";
        }
    }
}

export default GameState;