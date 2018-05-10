import { Board } from '../libs/board';
import { Browser } from '../libs/browser';


export class Bot {
    private board: Board;
    private browser: Browser;
    private node: number = 0;
    private max_depth = 5;

    constructor() {
        this.board = new Board();
        this.board.set(1, 1, 2);
        this.browser = new Browser('chrome');
    }

    public setBoard(newBoard: Board) {
        this.board = newBoard;
    }

    public syncBoard(newBoard: Board) {
        // Update board and return true is criteria is satified,
        // otherwise return false
        const newScore = newBoard.calculateScore();
        const oldScore = this.board.calculateScore();
        const difference = newScore - oldScore;
        if (difference == 2 || difference == 4) {
            this.board = newBoard;
            return true;
        } else {
            return false;
        }
    }

    public getScore() {
        return this.board.calculateScore();
    }

    public print() {
        console.log(this.board.toString());
    }

    public calcuateNextMove(): string {
        return 'UP';
    }

    public getBoard() {
        return this.board;
    }
}
