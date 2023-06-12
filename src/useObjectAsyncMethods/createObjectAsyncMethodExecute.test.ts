import createDeferred from '@bitty/deferred';
import createObjectAsyncMethodExecute from './createObjectAsyncMethodExecute';

class Authentication {
  deferred = createDeferred<boolean>();

  isAuthenticated = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authenticate(_credentials: string): Promise<boolean> {
    this.deferred = createDeferred();

    this.isAuthenticated = await this.deferred.promise;

    return this.isAuthenticated;
  }
}

describe('createObjectAsyncMethodExecute', () => {
  it("throws when the property isn't a method", () => {
    const authentication = new Authentication();

    expect(() => {
      // @ts-expect-error because 'deferred' isn't an async method key.
      createObjectAsyncMethodExecute(jest.fn(), authentication, 'deferred');
    }).toThrow('Can\'t handle "deferred" as an async method.');
  });

  describe('execute', () => {
    it('executes the original method', async () => {
      const authenticate = jest.spyOn(Authentication.prototype, 'authenticate');

      const authentication = new Authentication();

      const execute = createObjectAsyncMethodExecute(
        jest.fn(),
        authentication,
        'authenticate',
      );

      const promise = execute('ex@ex.com:123456');

      authentication.deferred.resolve(true);

      expect(authenticate).toHaveBeenCalledWith('ex@ex.com:123456');

      expect(await promise).toBe(true);

      authenticate.mockRestore();
    });

    it('updates the state with method information', async () => {
      const authentication = new Authentication();

      const dispatch = jest.fn();

      const execute = createObjectAsyncMethodExecute(
        dispatch,
        authentication,
        'authenticate',
      );

      let promise = execute('x@x.com:password');

      expect(dispatch).toHaveBeenCalledWith({
        key: 'authenticate',
        type: 'STARTED',
      });

      authentication.deferred.resolve(true);

      await expect(promise).resolves.toBe(true);

      expect(dispatch).toHaveBeenCalledWith({
        key: 'authenticate',
        type: 'COMPLETED',
        result: true,
      });

      promise = execute('x@x.com:password2');

      expect(dispatch).toHaveBeenCalledWith({
        key: 'authenticate',
        type: 'STARTED',
      });

      authentication.deferred.reject(new Error('Mismatch email and password.'));

      await expect(promise).rejects.toEqual(
        new Error('Mismatch email and password.'),
      );

      expect(dispatch).toHaveBeenCalledWith({
        key: 'authenticate',
        type: 'FAILED',
        cause: new Error('Mismatch email and password.'),
      });
    });
  });
});
