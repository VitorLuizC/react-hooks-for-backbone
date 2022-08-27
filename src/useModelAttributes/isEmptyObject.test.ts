import isEmptyObject from './isEmptyObject';

describe('isEmptyObject', () => {
  it('checks if received object is empty', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ name: 'Karl' })).toBe(false);
  });
});
