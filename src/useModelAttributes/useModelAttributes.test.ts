import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useModelAttributes from './useModelAttributes';

describe('useModelAttributes', () => {
  xdescribe('when deletes a property', () => {
    type ModelAttributes = {
      color?: string;
    };

    const model = new Model<ModelAttributes>({
      color: 'red',
    });

    it("unsets model's attribute", () => {
      const { result } = renderHook(() => useModelAttributes(model));

      act(() => {
        delete result.current.color;
      });

      expect(model.has('color')).toBe(false);
    });
  });

  describe('when gets a property', () => {
    type ModelAttributes = {
      color?: string;
    };

    const model = new Model<ModelAttributes>({
      color: 'red',
    });

    xit("gets model's attribute", () => {
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

  xdescribe('when sets a property', () => {
    type ModelAttributes = {
      color?: string;
    };

    const model = new Model<ModelAttributes>({
      color: 'red',
    });

    it("updates model's attribute", () => {
      const { result } = renderHook(() => useModelAttributes(model));

      act(() => {
        result.current.color = 'blue';
      });

      expect(result.current.color).toBe('blue');
    });
  });
});
