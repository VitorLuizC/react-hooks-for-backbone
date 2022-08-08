import getChanges from './getChanges';

describe('getChanges', () => {
  it('gets the changes between two objects', () => {
    type Answers = { a: number; b: number; c: number };

    expect(getChanges<Answers>({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({
      b: 3,
    });
  });
});
