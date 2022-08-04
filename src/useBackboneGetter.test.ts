import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useBackboneGetter from './useBackboneGetter.js';

type User = Model<{
  firstName: string;
  lastName: string;
}>;

describe('useBackboneGetter', () => {
  const user: User = new Model({
    firstName: 'Carlos',
    lastName: 'Marcos',
  });

  const getFullName = (user: User): string => {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */

    const firstName = user.get('firstName')!;
    const lastName = user.get('lastName')!;
    return firstName.concat(' ', lastName);
  };

  describe('when first renders', () => {
    it('returns result using getter function', () => {
      const getter = jest.fn(getFullName);

      const { result } = renderHook(() => {
        return useBackboneGetter(getter, {
          object: user,
        });
      });

      expect(getter).toHaveBeenCalled();

      expect(result.current).toBe('Carlos Marcos');
    });
  });

  describe('when watching an event', () => {
    it('executes the getter when event is triggered', () => {
      const getter = jest.fn(getFullName);

      const { result } = renderHook(() => {
        return useBackboneGetter(getter, {
          object: user,
          watchEvents: ['rename'],
        });
      });

      expect(getter).toHaveBeenCalledTimes(1);

      act(() => {
        user.set('firstName', 'Frederico');
        user.set('lastName', 'dos Anjos');
        user.trigger('rename');
      });

      expect(getter).toHaveBeenCalledTimes(2);

      expect(result.current).toBe('Frederico dos Anjos');
    });
  });

  describe('when watching a list of values', () => {
    type CalcModel = Model<{ operation: '+' | '-' }>;

    const object: CalcModel = new Model({ operation: '+' });

    const calc = (calc: CalcModel, valueA: number, valueB: number) => {
      return calc.get('operation') === '+' ? valueA + valueB : valueA - valueB;
    };

    it('pass the values as getter parameters', () => {
      const getter = jest.fn(calc);

      renderHook(() => {
        return useBackboneGetter(getter, {
          object,
          watchValues: [1, 2],
        });
      });

      expect(getter).toHaveBeenCalledWith(object, 1, 2);
    });

    it('executes the getter when values changes', () => {
      const getter = jest.fn(calc);

      const { rerender, result } = renderHook(
        (watchValues: [number, number]) => {
          return useBackboneGetter(getter, {
            object,
            watchValues,
          });
        },
        { initialProps: [3, 4] },
      );

      expect(getter).toHaveBeenCalledTimes(1);

      rerender([5, 6]);

      expect(getter).toHaveBeenCalledTimes(2);

      expect(result.current).toBe(11);
    });
  });
});
