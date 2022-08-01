import type { Events } from 'backbone';
import { useEffect, useState } from 'react';
import useHandler from './utils/useHandler.js';
import useBackboneEventListener from './useBackboneEventListener.js';

/**
 * Function that uses a model, or a collection, and a list of values as
 * parameters to get the result.
 *
 * @example
 *
 * ```ts
 * const getAvatar: GetterFunction<Model<User>, [AppDetails]> = (user, app) => {
 *   return `${app.baseUrl}/avatar/${user.get('companyId')}/${user.get('id')}`;
 * };
 * ```
 */
export type GetterFunction<
  TResult,
  TObject extends Events,
  TValues extends unknown[] = [],
> = (object: TObject, ...values: TValues) => TResult;

/**
 * Object that contains the model, or the collection, and a list values and
 * events to watch in order to get some heavy calculated result.
 *
 * @example
 *
 * ```ts
 * const options: GetterOptions<Model<User>, [AppDetails]> = {
 *   model: user,
 *   watch: {
 *     values: [app],
 *     events: ['']
 *   }
 * }
 * ```
 */
export type GetterOptions<
  TObject extends Events,
  TValues extends unknown[] = [],
> = {
  object: TObject;
  watch?: {
    values?: TValues;
    events?: string[];
  };
};

/**
 * React.js Hook that calculates a result derived from the received model, or
 * collection, and a list values. It's calculated on the first-render and
 * every time watched values change, or watched events are emitted.
 *
 * @remarks
 *
 * ⚠️ it doesn't react to getter function's change, only to 'object' and the
 * watched 'values' and 'events'.
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
 * const fullName = useGetter(getFullName, {
 *   object: user,
 *   watch: {
 *     events: ['sync', 'change'],
 *   },
 * });
 * ```
 */
function useGetter<
  TResult,
  TObject extends Events,
  TValues extends unknown[] = [],
>(
  getter: GetterFunction<TResult, TObject, TValues>,
  options: GetterOptions<TObject, TValues>,
) {
  const { object, watch: { values = [], events = [] } = {} } = options;

  const getResult = useHandler(() => {
    return getter(object, ...(values as TValues));
  });

  const [result, setResult] = useState(getResult);

  const updateResult = () => setResult(getResult);

  useEffect(updateResult, [object, ...values]);

  useBackboneEventListener(object, events, updateResult);

  return result;
}

export default useGetter;
