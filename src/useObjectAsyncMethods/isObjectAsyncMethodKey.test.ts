import Backbone from 'backbone';
import isObjectAsyncMethodKey from './isObjectAsyncMethodKey';

describe('isObjectAsyncMethodKey', () => {
  it('checks if key is an object property key', () => {
    class Calc extends Backbone.Model {}

    const calc = new Calc();

    expect(isObjectAsyncMethodKey(calc, 'get')).toBe(true);

    expect(isObjectAsyncMethodKey(calc, 'operation')).toBe(false);
  });
});
