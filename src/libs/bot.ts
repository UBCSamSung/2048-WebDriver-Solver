import { Board } from '../libs/board';
import { Browser } from '../libs/browser';
import * as util from '../libs/util';

export class Bot {

    rotate(grid: number[]): any {
        return util.rotateRight(grid);
    }
    moveLeft(grid: number[]): [number[], number] {
        var k = 0;
        var base = 0;
        var score = 0;
        var result = new Array(16);
        for (var i = 4; i <= 16; i += 4) {
            while (k < i) {
                if (grid[k] == 0) {
                    ++k;
                    continue;
                }
                if (k + 1 < i && grid[k] == grid[k + 1]) {
                    result[base++] = grid[k] * 2;
                    score += grid[k] * 2;
                    k += 2;
                } else {
                    result[base++] = grid[k++];
                }
            }
            while (base < i) {
                result[base++] = 0;
            }
        }
        return [result, score];
    }
    private board: Board;
    private browser: Browser;
    private node: number = 0;
    private max_depth = 5;
    private bestOperation = 0;

    constructor() {
        this.board = new Board();
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
        const grid = this.board.grid;
        for (let i = 0; i < grid.length; i += 4) {
            console.log(grid.slice(i, i + 4));
        }
    }

    public calcuateNextMove(): string {
        const moveCode = this.startSearch();
        switch (moveCode) {
            case 0:
                return 'LEFT';
            case 1:
                return 'DOWN';
            case 2:
                return 'RIGHT';
            case 3:
                return 'UP';

            default:
                return ''
        }
    }

    public startSearch() {
        this.max_depth = 2;
        this.node = 0;
        while (true) {
            this.search(this.board.grid, 0);
            if (this.node > 2000 || this.max_depth >=8) break;
            this.max_depth++;
        }
        return this.bestOperation;
    }

    private search(grid: number[], depth: number) {
        this.node++;
        if (depth >= this.max_depth) return this.estimate(grid);
        let best = -1;
        for (let i = 0; i < 4; ++i) {
            let results = this.moveLeft(grid);
            let nextGrid = results[0];
            let isSame = true;
            for (let j = 0; j < 16; j++) {
                if (nextGrid[j] != grid[j]) {
                    isSame = false;
                    break;
                }
            }
            if (!isSame) {
                let temp = 0;
                let empty_count = 0;
                for (let j = 0; j < 16; j++) {
                    if (nextGrid[j] == 0) {
                        empty_count++;
                        nextGrid[j] = 2;
                        temp += this.search(nextGrid, depth + 1) * 0.9;
                        nextGrid[j] = 4;
                        temp += this.search(nextGrid, depth + 1) * 0.1;
                        nextGrid[j] = 0;
                    }
                }
                if (empty_count != 0) {
                    temp = temp / empty_count;
                } else {
                    temp = -Infinity;
                }
                if (results[1] + temp > best) {
                    best = results[1] + temp;
                    if (depth == 0) {
                        this.bestOperation = i;
                    }
                }
            }
            if (i != 3) {
                grid = this.rotate(grid);
            }
        }
        return best;
    }

    public estimate(grid: number[]): number {
        let diff = 0;
        let sum = 0;
        for (let i = 0; i < 16; ++i) {
            sum += grid[i];
            if (i % 4 != 3) {
                diff += Math.abs(grid[i] - grid[i + 1]);
            }
            if (i < 12) {
                diff += Math.abs(grid[i] - grid[i + 4]);
            }
        }
        return (sum * 4 - diff) * 2;
    }
}
