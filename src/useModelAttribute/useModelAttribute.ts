import type { Model, ModelSetOptions } from 'backbone';
import { useCallback, useMemo } from 'react';
import { useObjectEventListener } from '../useObjectEventListener';
import {
  ObjectEvents,
  ObjectsEvents,
  useObjectsEventsListeners,
} from '../useObjectsEventsListeners';
import useUpdate from '../utils/useUpdate';

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
  TAttributes,
  TAttributeName extends string & keyof TAttributes,
  TOptions = ModelSetOptions,
> = (
  newValueOrFunction:
    | TAttributes[TAttributeName]
    | ((
        value: NonNullable<TAttributes[TAttributeName]> | null,
      ) => TAttributes[TAttributeName]),
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
  TAttributes,
  TAttributeName extends string & keyof TAttributes,
  TOptions = ModelSetOptions,
> = {
  name: TAttributeName;
  model: Model<TAttributes, TOptions>;
  watchEvents?: string[];
  watchRelatedEvents?: ObjectEvents | ObjectsEvents;
};

/**
 * React.js Hook that provides the Backbone Models' attribute value and a
 * function to update it. It also watches received events to keep its value
 * synchronized with the model.
 *
 * @example
 *
 * ```ts
 * const [name, setName] = useModelAttribute({
 *   key: 'name',
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
  TAttributes,
  TAttributeName extends string & keyof TAttributes,
  TOptions = ModelSetOptions,
>(
  options: UseModelAttributeOptions<TAttributes, TAttributeName, TOptions>,
): [
  value: NonNullable<TAttributes[TAttributeName]> | null,
  setValue: UseModelAttributeSet<TAttributes, TAttributeName, TOptions>,
] {
  const { name, model, watchEvents = [], watchRelatedEvents = [] } = options;

  const getValue = useCallback(() => model.get(name) ?? null, [name, model]);

  const [updateId, update] = useUpdate();

  useObjectEventListener(model, watchEvents, update);

  useObjectsEventsListeners(watchRelatedEvents, update);

  const value = useMemo(getValue, [getValue, updateId]);

  type SetValue = UseModelAttributeSet<TAttributes, TAttributeName, TOptions>;

  const setValue = useCallback<SetValue>(
    (newValueOrFunction, options) => {
      const newValue =
        typeof newValueOrFunction !== 'function'
          ? newValueOrFunction
          : // @ts-expect-error because attribute's value could be a function.
            newValueOrFunction(getValue());

      model.set(name, newValue, options);

      update();
    },
    [name, model, getValue],
  );

  return [value, setValue];
}

export default useModelAttribute;
