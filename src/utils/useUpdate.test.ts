import { act, renderHook } from '@testing-library/react';
import useUpdate from './useUpdate';

describe('useUpdate', () => {
  it('provides an unique symbol as update id', () => {
    const { result } = renderHook(useUpdate);

    expect(typeof result.current[0]).toBe('symbol');
  });

  it('provides a function to update the id', () => {
    const { result } = renderHook(useUpdate);

    const currentUpdateId = result.current[0];

    act(result.current[1]);

    expect(currentUpdateId).not.toBe(result.current[0]);
  });
});
