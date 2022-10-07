import type { Events } from 'backbone';
import { useCallback, useState } from 'react';
import { useObjectEventListener } from '../useObjectEventListener';
import {
  ObjectEvents,
  ObjectsEvents,
  useObjectsEventsListeners,
} from '../useObjectsEventsListeners';
import useDidUpdateEffect from './useDidUpdateEffect';

/**
 * Function that uses a model, or a collection, and a list of values as
 * parameters to get the result.
 *
 * @example
 *
 * ```ts
 * let getAvatar: UseObjectGetterFunction<Model<User>, [AppDetails]>;
 *
 * getAvatar = (user, app) => {
 *   return `${app.baseUrl}/avatar/${user.get('companyId')}/${user.get('id')}`;
 * };
 * ```
 */
export type UseObjectGetterFunction<
  TResult,
  TObject extends Events | undefined | null,
  TValues extends unknown[] = [],
> = (object: TObject, ...values: TValues) => TResult;

/**
 * Object that contains a model, or a acollection, and a list values and
 * events to watch in order to get the result.
 *
 * @example
 *
 * ```ts
 * const options: UseObjectGetterOptions<Model<User>, [AppDetails]> = {
 *   object: user,
 *   watchEvents: ['change:companyId'],
 *   watchValues: [app],
 *   watchRelatedEvents: [app, 'change:base_url'],
 * };
 * ```
 */
export type UseObjectGetterOptions<
  TObject extends Events | undefined | null,
  TValues extends unknown[] = [],
> = {
  object: TObject;
  watchEvents?: string[];
  watchValues?: TValues;
  watchRelatedEvents?: ObjectEvents | ObjectsEvents;
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
 * const fullName = useObjectGetter(getFullName, {
 *   object: user,
 *   watchEvents: ['sync', 'change'],
 * });
 * ```
 */
function useObjectGetter<
  TResult,
  TObject extends Events | undefined | null,
  TValues extends unknown[] = [],
>(
  getter: UseObjectGetterFunction<TResult, TObject, TValues>,
  options: UseObjectGetterOptions<TObject, TValues>,
): TResult {
  const {
    object,
    watchValues = [],
    watchEvents = [],
    watchRelatedEvents = [],
  } = options;

  const getResult = useCallback(() => {
    return getter(object, ...(watchValues as TValues));
  }, [object, ...watchValues]);

  const [result, setResult] = useState(getResult);

  const handleUpdate = () => setResult(getResult);

  useDidUpdateEffect(handleUpdate, [getResult]);

  useObjectEventListener(object, watchEvents, handleUpdate);

  useObjectsEventsListeners(watchRelatedEvents, handleUpdate);

  return result;
}

export default useObjectGetter;
