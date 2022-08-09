import type { Events } from 'backbone';
import type AnyFunction from '../types/AnyFunction';
import { useHandler } from '../useHandler';
import useEffectWithDeepEqual from './useEffectWithDeepEqual';

/**
 * Tuple that contains a model, or a collection, and the event names to listen
 * from it in {@link useObjectsEventsListeners} hook.
 *
 * @example
 *
 * ```ts
 * const user = new Backbone.Model<UserAttributes>({ id });
 *
 * const subject: ObjectEvents = [
 *   user,
 *   'change:name',
 *   'change:email',
 *   'change:email_confirmation'
 * ];
 * ```
 */
export type ObjectEvents = [object: Events, ...events: string[]];

/**
 * List of {@link ObjectEvents}.
 *
 * @example
 *
 * ```ts
 * const user = new Backbone.Model<UserAttributes>({ id });
 *
 * const subjects: ObjectsEvents = [
 *   [user, 'change:name'],
 *   [user, 'change:email', 'change:email_confirmation'],
 * ];
 * ```
 */
export type ObjectsEvents = ObjectEvents[];

/**
 * React.js Hook that listens the received objects' events and execute callback
 * when they happen.
 *
 * @example
 *
 * ```js
 * const subjects = [
 *   [user, 'sync', 'change:roles'],
 *   [company, 'sync', 'change:roles_configuration'],
 *   [roles, 'sync'],
 * ];
 *
 * useObjectsEventsListeners(subjects, updateUserPermissions);
 *
 * // or
 *
 * useObjectsEventsListeners(
 *   [user, 'change:permissions'],
 *   updateUserPermissions,
 * );
 * ```
 */
function useObjectsEventsListeners(
  objectOrObjectsEvents: ObjectEvents | ObjectsEvents,
  callback: AnyFunction,
): void {
  const handler = useHandler(callback);

  useEffectWithDeepEqual(() => {
    const objectsEvents = Array.isArray(objectOrObjectsEvents[0])
      ? (objectOrObjectsEvents as ObjectEvents[])
      : [objectOrObjectsEvents as ObjectEvents];

    objectsEvents.forEach(([object, ...events]) => {
      if (!object || !events.length) return;

      object.on(events.join(' '), handler);
    });

    return () => {
      objectsEvents.forEach(([object, ...events]) => {
        if (!object || !events.length) return;

        object.off(events.join(' '), handler);
      });
    };
  }, [handler, objectOrObjectsEvents]);
}

export default useObjectsEventsListeners;
