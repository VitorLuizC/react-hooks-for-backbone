import type { Events } from 'backbone';
import { useMemo } from 'react';
import useBackboneEventListener from './useBackboneEventListener.js';
import useBackboneListenTo, {
  BackboneEventSubjects,
} from './useBackboneListenTo.js';
import useUpdate from './utils/useUpdate.js';

/**
 * Function that uses a model, or a collection, and a list of values as
 * parameters to get the result.
 *
 * @example
 *
 * ```ts
 * let getAvatar: BackboneGetterFunction<Model<User>, [AppDetails]>;
 *
 * getAvatar = (user, app) => {
 *   return `${app.baseUrl}/avatar/${user.get('companyId')}/${user.get('id')}`;
 * };
 * ```
 */
export type BackboneGetterFunction<
  TResult,
  TObject extends Events,
  TValues extends unknown[] = [],
> = (object: TObject, ...values: TValues) => TResult;

/**
 * Object that contains a model, or a acollection, and a list values and
 * events to watch in order to get the result.
 *
 * @example
 *
 * ```ts
 * const options: BackboneGetterOptions<Model<User>, [AppDetails]> = {
 *   object: user,
 *   watchEvents: ['change:companyId'],
 *   watchValues: [app],
 *   watchRelatedEvents: [app, 'change:base_url'],
 * };
 * ```
 */
export type BackboneGetterOptions<
  TObject extends Events,
  TValues extends unknown[] = [],
> = {
  object: TObject;
  watchEvents?: string[];
  watchValues?: TValues;
  watchRelatedEvents?: BackboneEventSubjects;
};

/**
 * React.js Hook that calculates a result derived from the received model, or
 * collection, and the watched list of values. It's calculated on the
 * first-render and every time watched values changes, or events are triggered.
 *
 * @remarks
 *
 * ⚠️ it doesn't react to `getter` function's change. So it doesn't have to be
 * defined using `useCallback` or `useMemo`.
 *
 * @example
 *
 * ```ts
 * type User = Model<{
 *   first_name: string;
 *   last_name: string;
 * }>;
 *
 * function getFullName(user: User) {
 *   return user.get('first_name') + ' ' + user.get('last_name');
 * }
 *
 * const fullName = useBackboneGetter(getFullName, {
 *   object: user,
 *   watchEvents: ['sync', 'change'],
 * });
 * ```
 */
function useBackboneGetter<
  TResult,
  TObject extends Events,
  TValues extends unknown[] = [],
>(
  getter: BackboneGetterFunction<TResult, TObject, TValues>,
  options: BackboneGetterOptions<TObject, TValues>,
): TResult {
  const {
    object,
    watchValues = [],
    watchEvents = [],
    watchRelatedEvents = [],
  } = options;

  const [updateId, update] = useUpdate();

  useBackboneListenTo(watchRelatedEvents, update);

  useBackboneEventListener(object, watchEvents, update);

  return useMemo(() => {
    return getter(object, ...(watchValues as TValues));
  }, [object, updateId, ...watchValues]);
}

export default useBackboneGetter;
