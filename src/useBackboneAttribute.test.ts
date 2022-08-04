import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useBackboneAttribute from './useBackboneAttribute';

type CarModelAttributes = {
  brand: string;
  model: string;
};

type CarModel = Model<CarModelAttributes>;

describe('useBackboneAttribute', () => {
  const car: CarModel = new Model({
    brand: 'Ferrari',
    model: 'Enzo',
  });

  it("returns model's attribute value", () => {
    const { result } = renderHook(() => {
      return useBackboneAttribute({
        key: 'brand',
        model: car,
      });
    });

    expect(result.current[0]).toBe('Ferrari');
  });

  it("returns a function to update model's attribute", () => {
    const { result } = renderHook(() => {
      return useBackboneAttribute({
        key: 'brand',
        model: car,
      });
    });

    const setBrand = result.current[1];

    act(() => setBrand('Porsche'));

    expect(result.current[0]).toBe('Porsche');
    expect(car.get('brand')).toBe('Porsche');

    act(() => setBrand((currentBrand) => currentBrand + '®'));

    expect(result.current[0]).toBe('Porsche®');
    expect(car.get('brand')).toBe('Porsche®');
  });

  describe('when watching events', () => {
    it("updates value when model's events are triggered", () => {
      const { result } = renderHook(() => {
        return useBackboneAttribute({
          key: 'model',
          model: car,
          watchEvents: ['rename'],
        });
      });

      car.set('model', '911');

      // Value only updates when using 'setValue' or triggering events
      expect(result.current[0]).toBe('Enzo');

      act(() => {
        car.trigger('rename');
      });

      expect(result.current[0]).toBe('911');
    });
  });
});
