import { renderHook } from '@testing-library/react';
import useEffectWithDeepEqual from './useEffectWithDeepEqual';

describe('useEffectWithDeepEqual', () => {
  it('only executes effect if dependencies array change', () => {
    const effect = jest.fn();

    const { rerender } = renderHook(
      (object) => useEffectWithDeepEqual(effect, [object]),
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialProps: { id: 1 } as any,
      },
    );

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({
      id: 1,
    });

    rerender({
      id: 1,
      other: {
        name: 'Numbers',
        numbers: [1, 2, 3],
      },
    });

    expect(effect).toHaveBeenCalledTimes(2);

    rerender({
      id: 1,
      other: {
        name: 'Numbers',
        numbers: [1, 2, 3],
      },
    });

    expect(effect).toHaveBeenCalledTimes(2);
  });
});
