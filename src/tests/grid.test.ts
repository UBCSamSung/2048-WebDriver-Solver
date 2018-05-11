import { Board } from '../libs/board';

describe('test game board', () => {
    let boardA: Board;
    let boardB: Board;

    const newGridStr = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0';

    beforeEach(() => {
        boardA = new Board();
        boardB = new Board();
    });

    test('set from string', () => {
        const testGridStr = '0,0,0,2,0,0,2,2,4,0,2,2,2,2,2,2';
        expect(boardA.toString()).toBe(newGridStr);
        boardA.fromString(testGridStr);
        expect(boardA.toString()).toBe(testGridStr);
    });
});
