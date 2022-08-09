/** Serializes the events in a single event name. */
function serializeEvents(eventOrEvents: string | string[]): string {
  const events = Array.isArray(eventOrEvents)
    ? [...new Set(eventOrEvents)].sort()
    : [eventOrEvents];

  return events.join(' ');
}

export default serializeEvents;
