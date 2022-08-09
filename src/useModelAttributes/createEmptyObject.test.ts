import getEmptyObject from './createEmptyObject';

describe('getEmptyObject', () => {
  it('creates an empty object', () => {
    const object = getEmptyObject();

    expect(object).not.toBeInstanceOf(Object);
    expect(object).toEqual({});
    expect(Object.getOwnPropertyDescriptors(object)).toEqual({});
  });
});
