import { Board } from "../libs/grid";
import { Browser } from "../libs/browser";

export class Bot {
    private board: Board;
    private browser: Browser;

    constructor() {
        this.board = new Board();
        this.board.set(1,1,2);
        this.browser = new Browser('chrome');
    }

    syncBoard(newBoard: Board) {
        // Update board and return true is criteria is satified,
        // otherwise return false
        const newScore = newBoard.calculateScore()
        const oldScore = this.board.calculateScore();
        const difference = newScore-oldScore;
        if (difference == 2 || difference == 4) {
            this.board = newBoard;
            return true;
        } else {
            return false;
        }
    }

    getScore() {
        return this.board.calculateScore();
    }

    print() {
        console.log(this.board.toString());
    }

    calcuateNextMove():string {
        return 'UP';
    }
}