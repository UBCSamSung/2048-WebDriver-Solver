test('simple', () => {
    expect(true).toBe(true);
});

test('simple 2', () => {
    expect(false).toBe(false);
});

test('jemu', () => {
    function parseCsv(data: string) {
        return data.split(',');
    }
    const input = '"Illya",is,"my\nWaifu"';
    expect(parseCsv(input)).toEqual([ '"Illya"', 'is', '"my\nWaifu"' ]);
});
