import type { Events } from 'backbone';
import { useEffect } from 'react';
import useHandler from './utils/useHandler.js';

/**
 * React.js Hook that listens object's events and executes the callback when
 * they happen. The object can be a Backbone Model, a Backbone Collection or
 * any Backbone object that implement its events interface.
 *
 * @example
 *
 * ```js
 * useBackboneEventListener(user, ['change'], function (this: UserModel) {
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
