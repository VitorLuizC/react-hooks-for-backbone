import serializeEvents from './serializeEvents';

describe('serializeEvents', () => {
  it('serializes the events into a single event string', () => {
    const eventsAsList = ['change', 'change:name', 'change:name', 'change:id'];

    expect(serializeEvents(eventsAsList)).toBe('change change:id change:name');

    expect(serializeEvents('sync')).toBe('sync');
  });
});
