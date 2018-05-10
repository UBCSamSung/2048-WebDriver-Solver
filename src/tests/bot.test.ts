import { Board } from '../libs/board';
import { Bot } from '../libs/bot';

describe('Bot test', () => {
    let bot: Bot;

    beforeEach(() => {
        bot = new Bot();
    });

    test('Test get score', () => {
        expect(bot.getScore()).toBe(2);
    });

    test('Test sync board', () => {
        const testBoard = new Board('0,0,0,2,0,0,2,2,4,0,2,2,2,2,2,2');
        const testBoard2 = new Board('0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2');
        bot.syncBoard(testBoard);
        expect(bot.getScore()).toBe(2);
        bot.syncBoard(testBoard2);
        expect(bot.getScore()).toBe(4);
    });

    test.skip('Test search', () => {
        let testArray = new Array;
        for (let i=1; i<16+1; i++) {
            testArray.push(Math.pow(2,i));
        }
        const testBoard = new Board(testArray.join());
        bot.setBoard(testBoard);        
        expect(bot.search(0)).toBe(2);
    });
});
