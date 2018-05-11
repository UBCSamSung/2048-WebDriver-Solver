import { isPowerOfTwo, equals, moveLeft } from './util';

export class Board {
    constructor(str?:string) {
        let grid: number[] = new Array(4 * 4);
        grid.fill(0);
        this.grid = grid;
        if (str) {
            this.fromString(str);
        }
    }

    grid: number[];

    toString(): string {
        let grid = this.grid;
        return grid.toString();
    }

    equals(input: Board): boolean {
        let gridA = this.grid;
        let gridB = input.grid;
        return equals(gridA, gridB);
    }

    fromString(str: string) {
        let rawGrid = str.split(',');
        let newGrid = new Array(16);
        newGrid.fill(0);
        if (rawGrid.length != 4 * 4) {
            throw 'invalid string';
        }
        rawGrid.forEach((val, i) => {
            let num = parseInt(val);
            if (isPowerOfTwo(num)) {
                newGrid[i] = num;
            }
        })
        this.grid = newGrid;
    }

    calculateScore() {
        let grid = this.grid;
        return grid.reduce(((acc, curr)=>{return acc+curr;}));
    }

    countEmptySpot() {
        let grid = this.grid;
        return grid.reduce(((acc, curr)=>{
            if (curr==0) return acc+1;
            else return acc;
        }));
    }
}
