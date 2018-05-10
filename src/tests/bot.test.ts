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

    test('Test estimate', () => {
        const testBoard = new Board('0,0,0,2,0,0,2,2,4,0,2,2,2,2,2,2');        
        expect(bot.estimate(testBoard.grid)).toBe(136);
        const testBoard2 = new Board('0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2');
        expect(bot.estimate(testBoard2.grid)).toBe(20);        
    },1);

    test('Test search', () => {
        expect(bot.startSearch()).toBe(0);
        const testBoard = new Board('0,0,0,2,0,0,2,2,4,0,2,2,2,2,2,2');        
        bot.setBoard(testBoard);
        expect(bot.startSearch()).toBe(2);              
    });
});
