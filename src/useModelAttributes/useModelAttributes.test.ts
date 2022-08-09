import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useModelAttributes from './useModelAttributes';

describe('useModelAttributes', () => {
  describe('when deletes a property', () => {
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
