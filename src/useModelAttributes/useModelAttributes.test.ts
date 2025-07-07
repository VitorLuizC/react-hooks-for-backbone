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

  it("doesn't throws error when getting attributes from nullish model", () => {
    const { result } = renderHook(() =>
      useModelAttributes<ModelAttributes>(null),
    );

    expect(result.current.color).toBeUndefined();

    expect(() => {
      act(() => {
        result.current.color = 'red';
      });
    }).toThrow();

    expect(result.current.color).toBeUndefined();

    expect(() => {
      act(() => {
        delete result.current.color;
      });
    }).toThrow();

    expect(result.current.color).toBeUndefined();
  });

  it("doesn't throws error when tries to access symbols", () => {
    const { result } = renderHook(() => useModelAttributes(model));

    // @ts-expect-error because 'Symbol.toStringTag' isn't an attribute
    const string = result.current[Symbol.toStringTag];

    expect(string).toBeUndefined();

    expect(() => {
      act(() => {
        // @ts-expect-error because 'Symbol.toStringTag' isn't an attribute
        result.current[Symbol.toStringTag] = 'Model';
      });
    }).toThrow();

    expect(() => {
      act(() => {
        // @ts-expect-error because 'Symbol.toStringTag' isn't an attribute
        delete result.current[Symbol.toStringTag];
      });
    }).toThrow();
  });

  it('updates the state when sets or deletes an attribute', () => {
    let updates = 0;

    const { result } = renderHook(() => {
      updates++;
      return useModelAttributes(model);
    });

    expect(updates).toBe(1);

    act(() => {
      result.current.color = 'blue';
    });

    expect(updates).toBe(2);

    act(() => {
      delete result.current.color;
    });

    expect(updates).toBe(3);
  });
});
