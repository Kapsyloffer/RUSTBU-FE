class Board {
    constructor(color, home, state) {
        this.color = color;
        this.home = home;
        this.state = state;
    }

    check(c, h){
        return c === this.color && h === this.home; //YODA HMMMMMMM
    }

    get_state(){
        return this.state;
    }
}

export default Board;