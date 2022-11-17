import type { Model, ModelSetOptions } from 'backbone';
import { useCallback, useMemo, useState } from 'react';
import type { KeyOf } from '../types';
import { useObjectEventListener } from '../useObjectEventListener';
import {
  ObjectEvents,
  ObjectsEvents,
  useObjectsEventsListeners,
} from '../useObjectsEventsListeners';
import getDefaultWatchEvents from './getDefaultWatchEvents';

/**
 * Function that receives two arguments:
 * - The first can be both the new attribute value, or a function that receives
 * previous attribute value and returns the new one;
 * - The second one is the Models' set options, which is optional.
 *
 * @example
 *
 * ```ts
 * declare const setUserName: UseModelAttributeSet<
 *   UserAttributes,
 *   'name',
 * >;
 *
 * setUserName('Unkown', {
 *   validate: true,
 * });
 *
 * // or
 *
 * setUserName((previousName) => previousName?.trim() ?? 'Uknown', {
 *   silent: true,
 * });
 * ```
 */
export type UseModelAttributeSet<
  TAttributes extends object,
  TAttributeName extends KeyOf<TAttributes>,
  TOptions = ModelSetOptions,
> = (
  newValueOrFunction:
    | TAttributes[TAttributeName]
    | ((value?: TAttributes[TAttributeName]) => TAttributes[TAttributeName]),
  options?: TOptions,
) => void;

/**
 * Object that contains the attribute key, its model and a list of events to
 * watch in order to keep its value synchronized.
 *
 * @example
 *
 * ```ts
 * const options = {
 *   name: 'name',
 *   model: user,
 *   watchEvents: ['rename', 'change:name'],
 * } as UseModelAttributeOptions<UserAttributes, 'name'>;
 * ```
 */
export type UseModelAttributeOptions<
  TAttributes extends object,
  TAttributeName extends KeyOf<TAttributes>,
  TOptions = ModelSetOptions,
> = {
  name: TAttributeName;
  model: Model<TAttributes, TOptions> | undefined | null;
  watchEvents?: string[];
  watchRelatedEvents?: ObjectEvents | ObjectsEvents;
};

/**
 * React.js Hook that provides the Backbone Models' attribute value and a
 * function to update it. It also watches received events to keep its value
 * synchronized with the model.
 *
 * By default it watches `'sync'`, `'change'`,  and `'change:${name}'` events,
 * but you can change it with `watchEvents` option.
 *
 * @example
 *
 * ```ts
 * const [name, setName] = useModelAttribute({
 *   name: 'name',
 *   model: user,
 *   watchEvents: ['change:name', 'sync', 'rename'],
 * });
 *
 *
 * const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
 *   setName(event.target.value);
 * };
 *
 * return <input value={name} onChange={handleChange} />;
 * ```
 */
function useModelAttribute<
  TAttributes extends object,
  TAttributeName extends KeyOf<TAttributes>,
  TOptions = ModelSetOptions,
>(
  options: UseModelAttributeOptions<TAttributes, TAttributeName, TOptions>,
): [
  value: TAttributes[TAttributeName] | undefined,
  setValue: UseModelAttributeSet<TAttributes, TAttributeName, TOptions>,
] {
  const { name, model, watchEvents, watchRelatedEvents = [] } = options;

  const [value, updateLocalValue] = useState(() => model?.get(name));

  const handleChange = useCallback(
    () => updateLocalValue(model?.get(name)),
    [name, model],
  );

  const defaultWatchEvents = useMemo(
    () => (model ? getDefaultWatchEvents(model, name) : []),
    [model, name],
  );

  useObjectEventListener(
    model,
    watchEvents ?? defaultWatchEvents,
    handleChange,
  );

  useObjectsEventsListeners(watchRelatedEvents, handleChange);

  type SetValue = UseModelAttributeSet<TAttributes, TAttributeName, TOptions>;

  const setValue = useCallback<SetValue>(
    (newValueOrFunction, options) => {
      const newValue =
        typeof newValueOrFunction !== 'function'
          ? newValueOrFunction
          : // @ts-expect-error because attribute's value could be a function.
            newValueOrFunction(model?.get(name));

      // It isn't typed, but Model.prototype.set returns `false` when invalid.
      if (model?.set(name, newValue, options)) updateLocalValue(newValue);
    },
    [name, model],
  );

  return [value, setValue];
}

export default useModelAttribute;
