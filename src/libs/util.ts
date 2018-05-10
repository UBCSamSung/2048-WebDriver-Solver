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
