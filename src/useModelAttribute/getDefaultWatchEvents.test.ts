import { Model } from 'backbone';
import getDefaultWatchEvents from './getDefaultWatchEvents';

describe('getDefaultWatchEvents', () => {
  it('returns default watch events', () => {
    const car = new Model({
      id: Math.random(),
      name: 'Golf GTI',
      brand: 'Volkswagen',
    });

    expect(getDefaultWatchEvents(car, 'name')).toEqual([
      'sync',
      'change',
      'change:name',
    ]);
  });
});
