import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useObjectGetter from './useObjectGetter';

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
        return useObjectGetter(getter, {
          object: user,
        });
      });

      expect(getter).toHaveBeenCalled();

      expect(result.current).toBe('Carlos Marcos');
    });

    it("doesn't throw errors when receives nullish object", () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const getter = jest.fn((_object: User | null) => {
        return null;
      });

      renderHook(() => {
        return useObjectGetter(getter, {
          object: null,
        });
      });

      expect(getter).toHaveBeenCalledWith(null);
    });
  });

  describe('when watching an event', () => {
    it('executes the getter when event is triggered', () => {
      const getter = jest.fn(getFullName);

      const { result } = renderHook(() => {
        return useObjectGetter(getter, {
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
        return useObjectGetter(getter, {
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
          return useObjectGetter(getter, {
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

  describe('when watching related events', () => {
    it('executes the getter when event is triggered', () => {
      const getter = jest.fn(getFullName);

      const { result } = renderHook(() => {
        return useObjectGetter(getter, {
          object: user,
          watchRelatedEvents: [user, 'rename'],
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
});
