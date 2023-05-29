import ObjectAsyncMethodError from './ObjectAsyncMethodError';

describe('ObjectAsyncMethodError', () => {
  it('is an error object', () => {
    const error = new ObjectAsyncMethodError('byId', { message: 'not found' });

    expect(error).toBeInstanceOf(Error);

    expect(error.name).toBe('ObjectAsyncMethodError');
    expect(error.cause).toEqual({ message: 'not found' });
    expect(error.message).toBe(
      '"byId" failed without an error object as cause.',
    );
  });
});
