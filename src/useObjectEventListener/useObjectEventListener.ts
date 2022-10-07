import type { Events } from 'backbone';
import { useEffect, useMemo } from 'react';
import { useHandler } from '../useHandler';
import serializeEvents from './serializeEvents';

/**
 * React.js Hook that listens object's events and executes the callback when
 * they happen. The object can be a Backbone Model, a Backbone Collection or
 * any Backbone object that implement its events interface.
 *
 * @example
 *
 * ```js
 * useObjectEventListener(user, ['change'], function (this: UserModel) {
 *   updatePermissions(this.get('roles'));
 * });
 * ```
 */
function useObjectEventListener<TObject extends Events>(
  object: TObject | undefined | null,
  eventOrEvents: string | string[],
  callback: (this: TObject, ...args: unknown[]) => void,
) {
  const events = useMemo(() => serializeEvents(eventOrEvents), [eventOrEvents]);

  const handler = useHandler(callback);

  useEffect(() => {
    if (!events || !object) return;

    object.on(events, handler);

    return () => {
      object.off(events, handler);
    };
  }, [object, events, handler]);
}

export default useObjectEventListener;
