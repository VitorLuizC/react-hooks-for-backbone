import createEmptyObject from './createEmptyObject';

describe('createEmptyObject', () => {
  it('creates an empty object', () => {
    const object = createEmptyObject();

    expect(object).not.toBeInstanceOf(Object);
    expect(object).toEqual({});
    expect(Object.getOwnPropertyDescriptors(object)).toEqual({});
  });
});
