import { act, renderHook } from '@testing-library/react';
import Backbone from 'backbone';
import useObjectAsyncMethods from './useObjectAsyncMethods';
import createDeferred, { Deferred } from '@bitty/deferred';

type UserAttributes = {
  id: number;
  name: string;
};

class User extends Backbone.Model<UserAttributes> {
  override id: number;

  deferred: Deferred<void>;

  constructor(attributes: UserAttributes) {
    super(attributes);

    this.id = attributes.id;
    this.deferred = createDeferred<void>();
  }

  async rename(name: string) {
    this.deferred = createDeferred<void>();

    await this.deferred.promise;

    this.set('name', name);

    return {
      id: this.id,
      name,
    };
  }
}

describe('useObjectAsyncMethods', () => {
  it('provides state and reactivity to object async methods', async () => {
    const user = new User({
      id: 1,
      name: 'Fred',
    });

    const { result } = renderHook(() => useObjectAsyncMethods(user));

    let promise: Promise<UserAttributes>;

    expect(result.current.rename.error).toBeNull();
    expect(result.current.rename.result).toBeNull();
    expect(result.current.rename.status).toBe('idle');

    act(() => {
      promise = result.current.rename.execute('Karl');
    });

    expect(result.current.rename.error).toBeNull();
    expect(result.current.rename.result).toBeNull();
    expect(result.current.rename.status).toBe('pending');

    await act(async () => {
      user.deferred.resolve();

      await expect(promise).resolves.toEqual({
        id: 1,
        name: 'Karl',
      });
    });

    expect(result.current.rename.error).toBeNull();
    expect(result.current.rename.result).toEqual({ id: 1, name: 'Karl' });
    expect(result.current.rename.status).toBe('completed');

    act(() => {
      promise = result.current.rename.execute('Fred');
    });

    expect(result.current.rename.error).toBeNull();
    expect(result.current.rename.result).toEqual({ id: 1, name: 'Karl' }); // Persists the last result.
    expect(result.current.rename.status).toBe('pending');

    await act(async () => {
      user.deferred.reject(new Error('Already used'));

      await expect(promise).rejects.toEqual(new Error('Already used'));
    });

    expect(result.current.rename.error).toEqual(new Error('Already used'));
    expect(result.current.rename.result).toBeNull();
    expect(result.current.rename.status).toBe('failed');
  });

  it("doesn't support symbols", () => {
    const user = new User({
      id: 2,
      name: 'Franz',
    });

    const { result } = renderHook(() => useObjectAsyncMethods(user));

    // @ts-expect-error because symbols aren't allowed as indexes.
    expect(() => result.current[Symbol.iterator]).toThrowError(
      'Can\'t get "Symbol(Symbol.iterator)" as async method',
    );
  });

  it("doesn't object properties that aren't functions", () => {
    const user = new User({
      id: 3,
      name: 'Carlos',
    });

    const { result } = renderHook(() => useObjectAsyncMethods(user));

    // @ts-expect-error because non-async functions aren't allowed as indexes.
    expect(() => result.current.deferred).toThrowError(
      'Can\'t get "deferred" as async method because it isn\'t a function',
    );
  });
});
