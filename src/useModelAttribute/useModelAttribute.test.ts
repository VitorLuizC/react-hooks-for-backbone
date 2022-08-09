import { act, renderHook } from '@testing-library/react';
import { Model } from 'backbone';
import useModelAttribute from './useModelAttribute';

type CarModelAttributes = {
  brand: string;
  model: string;
};

type CarModel = Model<CarModelAttributes>;

describe('useModelAttribute', () => {
  const car: CarModel = new Model({
    brand: 'Ferrari',
    model: 'Enzo',
  });

  it("returns model's attribute value", () => {
    const { result } = renderHook(() => {
      return useModelAttribute({
        name: 'brand',
        model: car,
      });
    });

    expect(result.current[0]).toBe('Ferrari');
  });

  it("returns a function to update model's attribute", () => {
    const { result } = renderHook(() => {
      return useModelAttribute({
        name: 'brand',
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
        return useModelAttribute({
          name: 'model',
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

  describe('when watching related revents', () => {
    it("updates value when model's events are triggered", () => {
      const { result } = renderHook(() => {
        return useModelAttribute({
          name: 'model',
          model: car,
          watchRelatedEvents: [car, 'rename'],
        });
      });

      car.set('model', 'Enzo');

      // Value only updates when using 'setValue' or triggering events
      expect(result.current[0]).toBe('911');

      act(() => {
        car.trigger('rename');
      });

      expect(result.current[0]).toBe('Enzo');
    });
  });
});
