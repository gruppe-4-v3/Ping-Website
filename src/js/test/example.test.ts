function sum(...a: number[]): number {
    return a.reduce((acc, val) => acc + val, 0);
}

test("testName", () => expect(sum(1,4)).toBe(5))