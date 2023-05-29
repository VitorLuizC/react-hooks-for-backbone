import { act, renderHook } from '@testing-library/react';
import ObjectAsyncMethodError from './ObjectAsyncMethodError';
import useObjectAsyncMethodsState from './useObjectAsyncMethodsState';

class User {
  async getRoles(): Promise<string[]> {
    await Promise.resolve();

    return ['admin'];
  }
}

describe('useObjectAsyncMethodsState', () => {
  it('managers object async methods state', () => {
    const user = new User();

    const { result } = renderHook(() => useObjectAsyncMethodsState(user));

    const [, dispatch] = result.current;

    expect(result.current[0]).toEqual({});

    act(() => {
      dispatch({
        key: 'getRoles',
        type: 'STARTED',
      });
    });

    expect(result.current[0]).toEqual({
      getRoles: {
        error: null,
        result: null,
        status: 'pending',
      },
    });

    act(() => {
      dispatch({
        key: 'getRoles',
        type: 'FAILED',
        cause: new Error('Invalid user'),
      });
    });

    expect(result.current[0]).toEqual({
      getRoles: {
        error: new Error('Invalid user'),
        status: 'failed',
        result: null,
      },
    });

    act(() => {
      dispatch({
        key: 'getRoles',
        type: 'COMPLETED',
        result: ['admin'],
      });
    });

    expect(result.current[0]).toEqual({
      getRoles: {
        error: null,
        result: ['admin'],
        status: 'completed',
      },
    });
  });

  it('provides an error object when async method fail without one', () => {
    const user = new User();

    const { result } = renderHook(() => useObjectAsyncMethodsState(user));

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        key: 'getRoles',
        type: 'FAILED',
        cause: 'not found', // it isn't an error object
      });
    });

    expect(result.current[0]).toEqual({
      getRoles: {
        error: new ObjectAsyncMethodError('getRoles', 'not found'),
        status: 'failed',
        result: null,
      },
    });
  });
});
