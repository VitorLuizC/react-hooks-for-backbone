import { renderHook } from '@testing-library/react';
import useHandler from './useHandler';

describe('useHandler', () => {
  it('runs the most recent callback', () => {
    const handlerA = jest.fn(() => 'A');
    const handlerB = jest.fn(() => 'B');

    const { result, rerender } = renderHook(useHandler, {
      initialProps: handlerA,
    });

    expect(result.current()).toBe('A');
    expect(handlerA).toHaveBeenCalled();

    rerender(handlerB);

    expect(result.current()).toBe('B');
    expect(handlerB).toHaveBeenCalled();
  });

  it('preserves its reference', () => {
    const handlerA = () => 'A';
    const handlerB = () => 'B';

    // Handlers A and B have different references.
    expect(handlerA).not.toBe(handlerB);

    const { result, rerender } = renderHook(useHandler, {
      initialProps: handlerA,
    });

    const reference0 = result.current;

    expect(reference0).not.toBe(handlerA);

    rerender(handlerB);

    const reference1 = result.current;

    expect(reference1).toBe(reference0);
    expect(reference0).not.toBe(handlerB);
  });
});
