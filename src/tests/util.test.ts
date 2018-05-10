import {isPowerOfTwo} from '../libs/util';

test('basic', () => {

    expect(isPowerOfTwo(2)).toBeTruthy();
    expect(isPowerOfTwo(0)).toBeFalsy();
    expect(isPowerOfTwo(6)).toBeFalsy();
    for (let i = 1; i < 1000; i *= 2) {
        expect(isPowerOfTwo(i)).toBeTruthy();
    }
});
