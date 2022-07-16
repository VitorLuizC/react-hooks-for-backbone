import { renderHook } from '@testing-library/react';
import useMounted from './useMounted.js';

describe('useMounted', () => {
  it('returns a function', () => {
    const { result } = renderHook(useMounted);

    expect(typeof result.current).toBe('function');
  });

  describe('isMounted', () => {
    it('checks if component is mounted', () => {
      const { result, unmount } = renderHook(useMounted);

      const isMounted = result.current;

      expect(isMounted()).toBe(true);

      unmount();

      expect(isMounted()).toBe(false);
    });
  });
});
