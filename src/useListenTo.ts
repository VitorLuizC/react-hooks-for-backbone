import { Events, EventsMixin } from 'backbone';
import { useLayoutEffect } from 'react';
import useHandler from './useHandler';

// @ts-expect-error because 'EventsMixin' only exists as type. To implement its
// methods we have programatically define them using 'Events' mixin.
const Mixin: typeof EventsMixin = class Mixin {};

Object.assign(Mixin.prototype, Events);

/**
 * @private
 *
 * Class that extends Backbone's EventsMixin only to be used as listener for
 * models' and collections' events in {@link useListenTo}.
 */
class EventsListener extends Mixin implements Events {}

/**
 * @private
 *
 * Instance of {@link EventsListener} used by {@link useListenTo}.
 */
let listener: EventsListener;

/**
 * React.js Hook that listens model's, or collection's, events and execute the
 * callback when they happen.
 *
 * @example
 *
 * ```js
 * useListenTo(user, ['sync', 'change'], () => {
 *   updatePermissions(user.get('roles'));
 * });
 * ```
 */
function useListenTo<TObject extends Events>(
  object: TObject,
  eventOrEvents: string | string[],
  callback: (this: TObject, ...args: unknown[]) => void,
) {
  listener ??= new EventsListener();

  const events = Array.isArray(eventOrEvents)
    ? eventOrEvents.join(' ')
    : eventOrEvents;

  const handler = useHandler(callback);

  useLayoutEffect(() => {
    listener.listenTo(object, events, handler);

    return () => {
      listener.stopListening(object, events, handler);
    };
  }, [object, events, handler]);
}

export default useListenTo;
