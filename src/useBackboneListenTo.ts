import type { Events } from 'backbone';
import type AnyFunction from './types/AnyFunction.js';
import useHandler from './utils/useHandler.js';
import useEffectWithDeepEqual from './utils/useEffectWithDeepEqual.js';

/**
 * Tuple that contains a model, or a collection, and the event names to listen
 * from it in {@link useBackboneListenTo} hook.
 *
 * @example
 *
 * ```ts
 * const user = new Backbone.Model<UserAttributes>({ id });
 *
 * const subject: BackboneEventSubject = [
 *   user,
 *   'change:name',
 *   'change:email',
 * ];
 * ```
 */
export type BackboneEventSubject = [object: Events, ...events: string[]];

/**
 * Union between a single {@link BackboneEventSubject} and a list of it.
 *
 * @example
 *
 * ```ts
 * const user = new Backbone.Model<UserAttributes>({ id });
 *
 * const subject: BackboneEventSubjects = [
 *   user,
 *   'change:name',
 *   'change:email',
 * ];
 *
 * // or
 *
 * const subjects: BackboneEventSubjects = [
 *   [user, 'change:name'],
 *   [user, 'change:email', 'change:email_confirmation'],
 * ];
 * ```
 */
export type BackboneEventSubjects =
  | BackboneEventSubject
  | BackboneEventSubject[];

/**
 * React.js Hook that listens the received objects' events and execute callback
 * when they happen.
 *
 * @example
 *
 * ```js
 * const subjects = [
 *   [user, 'sync', 'change:roles'],
 *   [user, 'sync', 'change:roles_configuration'],
 *   [roles, 'sync'],
 * ];
 *
 * useBackboneListenTo(subjects, updateUserPermissions);
 *
 * // or
 *
 * useBackboneListenTo(
 *   [user, 'change:permissions'],
 *   updateUserPermissions,
 * );
 * ```
 */
function useBackboneListenTo(
  subjectOrSubjects: BackboneEventSubjects,
  callback: AnyFunction,
) {
  const handler = useHandler(callback);

  useEffectWithDeepEqual(() => {
    const subjects = Array.isArray(subjectOrSubjects[0])
      ? (subjectOrSubjects as BackboneEventSubject[])
      : [subjectOrSubjects as BackboneEventSubject];

    subjects.forEach(([object, ...events]) => {
      if (!object || !events.length) return;

      object.on(events.join(' '), handler);
    });

    return () => {
      subjects.forEach(([object, ...events]) => {
        if (!object || !events.length) return;

        object.off(events.join(' '), handler);
      });
    };
  }, [handler, subjectOrSubjects]);
}

export default useBackboneListenTo;
