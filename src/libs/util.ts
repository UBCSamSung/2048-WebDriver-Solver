export  function equals(a1: number[], a2: number[]): boolean {
    return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

export function toString(tiles: number[][]): string {
    let str: string = '';
    for (let i = 0; i < tiles.length; ++i) {
        for (let j = 0; j < tiles[i].length; ++j) {
            str += `${tiles[i][j]} `;
        }
        str += '\n';
    }
    return str;
}

export function isPowerOfTwo(x: number): boolean {
    return (x != 0) && ((x & (x - 1)) == 0);
}

export function moveLeft(grid: number[]) {
    grid.forEach((v, i) => {
        const leftIndex = i;
        const rightIndex = Math.floor(i / 4) * 4 + 3;
        let currIndex = i + 1;
        while (currIndex <= rightIndex) {
            if (grid[currIndex] == 0) {
                currIndex++;
                continue;
            }
            else if (grid[leftIndex] == 0) {
                let value = grid[currIndex];
                grid[currIndex] = 0;
                grid[leftIndex] = value;
            }
            else if (grid[currIndex] == grid[leftIndex]) {
                grid[currIndex] = 0;
                grid[leftIndex] *= 2;
            } else {
                break;
            }
        }
    });
    return grid;
}



export function rotateRight(grid:number[]) {
    let oldGrid = grid;
    let newGrid: number[] = new Array(oldGrid.length);
    newGrid.fill(0);
    const width = Math.floor(Math.sqrt(oldGrid.length));
    oldGrid.forEach((v, i) => {
        const x = i % width;
        const y = Math.floor(i / width);
        newGrid[width-1-y + x * width] = v;
    });
    return newGrid;
}
