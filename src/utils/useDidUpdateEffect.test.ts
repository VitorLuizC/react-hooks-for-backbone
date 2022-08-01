import { renderHook } from '@testing-library/react';
import useDidUpdateEffect from './useDidUpdateEffect.js';

describe('useDidUpdateEffect', () => {
  it('only runs the effect when component updates', () => {
    const effect = jest.fn();

    const { rerender } = renderHook(
      ({ name }) => useDidUpdateEffect(effect, [name]),
      {
        initialProps: {
          name: 'Corsa',
        },
      },
    );

    // It doesn't run the effect on first render.
    expect(effect).not.toHaveBeenCalled();

    rerender({
      name: 'Celta',
    });

    expect(effect).toHaveBeenCalled();
  });
});
