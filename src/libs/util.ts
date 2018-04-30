export  function equals(tilesA:number[][], tilesB:number[][]):boolean {
    if (tilesA.length!==tilesB.length) return false;
    for (let i = 0; i < tilesA.length; ++i) {
        if (tilesA[i].length != tilesB[i].length) return false;
        for (let j = 0; j < tilesA[i].length; ++i) {
            if (tilesA[i][j]!==tilesB[i][j]) return false;
        }
    }
    return true;
}

export function toString(tiles:number[][]): string {
    let str:string = '';
    for (let i = 0; i < tiles.length; ++i) {
        for (let j = 0; j < tiles[i].length; ++j) {
            str += `${tiles[i][j]} `;
        }
        str += '\n';
    }
    return str;
}