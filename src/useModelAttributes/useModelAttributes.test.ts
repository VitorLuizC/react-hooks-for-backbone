import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useModelAttributes from './useModelAttributes';

describe('useModelAttributes', () => {
  type ModelAttributes = {
    color?: string;
  };

  let model: Model<ModelAttributes>;

  beforeEach(() => {
    model = new Model({ color: 'red' });
  });

  describe('when deletes a property', () => {
    it("unsets model's attribute", () => {
      const { result } = renderHook(() => useModelAttributes(model));

      act(() => {
        delete result.current.color;
      });

      expect(model.has('color')).toBe(false);
    });
  });

  describe('when gets a property', () => {
    it("gets model's attribute", () => {
      const { result } = renderHook(() => useModelAttributes(model));

      expect(result.current.color).toBe('red');
    });

    it("keeps track of model's attribute changes", () => {
      const { result } = renderHook(() => useModelAttributes(model));

      expect(result.current.color).toBe('red');

      act(() => {
        model.set('color', 'blue');
      });

      expect(result.current.color).toBe('blue');
    });
  });

  describe('when sets a property', () => {
    it("updates model's attribute", () => {
      const { result } = renderHook(() => useModelAttributes(model));

      act(() => {
        result.current.color = 'blue';
      });

      expect(result.current.color).toBe('blue');
    });
  });

  it("doesn't throws error when receives nullish model", () => {
    const { result } = renderHook(() =>
      useModelAttributes<ModelAttributes>(null),
    );

    expect(result.current.color).toBeUndefined();

    expect(() => {
      act(() => {
        result.current.color = 'red';
      });
    }).toThrowError();

    expect(result.current.color).toBeUndefined();

    expect(() => {
      act(() => {
        delete result.current.color;
      });
    }).toThrowError();

    expect(result.current.color).toBeUndefined();
  });

  it("doesn't throws error when tries to access symbols", () => {
    const { result } = renderHook(() => useModelAttributes(model));

    // @ts-expect-error because 'Symbol.toStringTag' isn't declared as attribute
    const string = result.current[Symbol.toStringTag];

    expect(string).toBeUndefined();
  });
});
