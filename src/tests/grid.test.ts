import { Board } from '../libs/grid'

describe('test game board', () => {
    let boardA: Board;
    let boardB: Board;

    const newGridStr = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
    
    beforeEach(() => {
        boardA = new Board();
        boardB = new Board();
    })
    test('setter', () => {
        boardA.set(1, 3, Math.pow(2, 4));
        expect(boardA.equals(boardB)).toBeFalsy();
        boardB.set(1, 3, Math.pow(2, 4));
        expect(boardA.equals(boardB)).toBeTruthy();
    })

    test('set from string', () => {
        const testGridStr = "0,0,0,2,0,0,2,2,4,0,2,2,2,2,2,2";
        expect(boardA.toString()).toBe(newGridStr);
        boardA.setFromString(testGridStr);
        expect(boardA.toString()).toBe(testGridStr);
    })

    test('move left', () => {
        const testGridStr = "0,0,0,2,0,0,2,2,4,0,2,2,2,2,2,2";
        const expectGridStr = "2,0,0,0,4,0,0,0,4,4,0,0,4,4,0,0";
        boardA.setFromString(testGridStr);
        boardA.moveLeft();
        expect(boardA.toString()).toBe(expectGridStr);        
    })

    test('rotate right', () => {
        const testGridStr = "2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0";
        const expectGridStr = "0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2";
        boardA.setFromString(testGridStr);
        boardA.rotateRight();
        expect(boardA.toString()).toBe(expectGridStr);        
    })

    test('move down', () => {
        const testGridStr = "0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0";
        const expectGridStr = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0"
        boardA.setFromString(testGridStr);
        boardA.move('D');
        expect(boardA.toString()).toBe(expectGridStr);        
    })

    test('calculate score', ()=>{
        const testGridStr = "0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0";
        expect(boardA.calculateScore()).toBe(0);
        boardB.setFromString(testGridStr);
        expect(boardB.calculateScore()).toBe(4);
    })
})

