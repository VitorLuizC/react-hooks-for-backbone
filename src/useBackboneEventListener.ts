import type { Events } from 'backbone';
import { useEffect } from 'react';
import useHandler from './utils/useHandler.js';

/**
 * React.js Hook that listens model's, or collection's, events and execute the
 * callback when they happen. It also pass model, or collection, as context to
 * the callback.
 *
 * @example
 *
 * ```js
 * useListenTo(user, ['sync', 'change'], function (this: UserModel) {
 *   updatePermissions(this.get('roles'));
 * });
 * ```
 */
function useBackboneEventListener<TObject extends Events>(
  object: TObject,
  eventOrEvents: string | string[],
  callback: (this: TObject, ...args: unknown[]) => void,
) {
  const events = Array.isArray(eventOrEvents)
    ? eventOrEvents.join(' ')
    : eventOrEvents;

  const handler = useHandler(callback);

  useEffect(() => {
    if (!events) return;

    object.on(events, handler);

    return () => {
      object.off(events, handler);
    };
  }, [object, events, handler]);
}

export default useBackboneEventListener;
