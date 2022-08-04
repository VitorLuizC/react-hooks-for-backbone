import type { Model, ModelSetOptions } from 'backbone';
import { useCallback, useMemo } from 'react';
import useBackboneEventListener from './useBackboneEventListener.js';
import useUpdate from './utils/useUpdate.js';

/**
 * Function that receives two arguments: The first can be both the new
 * attribute value, or a function that receives previous attribute value and
 * returns the new one; and the second one is the Models' set options.
 *
 * @example
 *
 * ```ts
 * let setUserName: BackboneAttributeUpdate<
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
 *   validate: true,
 * });
 * ```
 */
export type BackboneAttributeUpdate<
  TAttributes,
  TKey extends string & keyof TAttributes,
  TOptions = ModelSetOptions,
> = (
  newValueOrFunction:
    | TAttributes[TKey]
    | ((value: NonNullable<TAttributes[TKey]> | null) => TAttributes[TKey]),
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
 *   key: 'name',
 *   model: user,
 *   watchEvents: ['rename', 'change:name'],
 * } as BackboneAttributeOptions<UserAttributes, 'name'>;
 * ```
 */
export type BackboneAttributeOptions<
  TAttributes,
  TKey extends string & keyof TAttributes,
  TOptions = ModelSetOptions,
> = {
  key: TKey;
  model: Model<TAttributes, TOptions>;
  watchEvents?: string[];
};

/**
 * React.js Hook that provides the Backbone Models' attribute value and a
 * function to update it. It also watches received events to keep its value
 * synchronized with the model.
 *
 * @example
 *
 * ```ts
 * const [name, setName] = useBackboneAttribute({
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
function useBackboneAttribute<
  TAttributes,
  TKey extends string & keyof TAttributes,
  TOptions = ModelSetOptions,
>(
  options: BackboneAttributeOptions<TAttributes, TKey, TOptions>,
): [
  value: NonNullable<TAttributes[TKey]> | null,
  setValue: BackboneAttributeUpdate<TAttributes, TKey, TOptions>,
] {
  const { key, model, watchEvents = [] } = options;

  const getValue = useCallback(() => model.get(key) ?? null, [key, model]);

  const [updateId, update] = useUpdate();

  useBackboneEventListener(model, watchEvents, update);

  const value = useMemo(getValue, [getValue, updateId]);

  type SetValue = BackboneAttributeUpdate<TAttributes, TKey, TOptions>;

  const setValue = useCallback<SetValue>(
    (newValueOrFunction, options) => {
      const newValue =
        typeof newValueOrFunction !== 'function'
          ? newValueOrFunction
          : // @ts-expect-error because attribute's value could be a function.
            newValueOrFunction(getValue());

      model.set(key, newValue, options);

      update();
    },
    [key, model, getValue],
  );

  return [value, setValue];
}

export default useBackboneAttribute;
