import type { Model, ModelSetOptions, Silenceable } from 'backbone';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type KeyOf from '../types/KeyOf';
import getEmptyObject from './createEmptyObject';
import getChangeEvent from '../utils/getChangeEvent';
import getChanges from './getChanges';
import isEmptyObject from './isEmptyObject';

/**
 * React.js Hook that provides the Backbone.js Model's attributes as an object.
 *
 * @example
 *
 * ```ts
 * const attributes = useModelAttributes(user);
 *
 * const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
 *   // Updates the model's attribute and re-renders the component.
 *   attributes.name = event.target.value;
 * };
 *
 * return (
 *   <input
 *     type="text"
 *     value={attributes.name}
 *     onChange={handleChange}
 *   />
 * );
 * ```
 */
function useModelAttributes<
  TAttributes extends object,
  TOptions extends Silenceable = ModelSetOptions,
>(
  model: Model<TAttributes, TOptions> | undefined | null,
  options?: TOptions,
): TAttributes {
  const [attributes, setAttributes] = useState<TAttributes>(getEmptyObject);

  const handleChange = useCallback(() => {
    setAttributes((previousAttributes) => {
      const changedAttributes = getChanges(
        previousAttributes,
        model?.attributes ?? {},
      );

      if (isEmptyObject(changedAttributes)) return previousAttributes;

      return Object.assign(
        getEmptyObject(),
        previousAttributes,
        changedAttributes,
      );
    });
  }, [model]);

  useEffect(() => {
    if (!model) return;

    model.on('sync change', handleChange);

    return () => {
      const attributesEvents = Object.keys(attributes).map((key) => {
        return getChangeEvent(model, key);
      });

      const events = ['sync', 'change'].concat(attributesEvents).join(' ');

      model.off(events, handleChange);
    };
  }, [model, handleChange]);

  const handlers = useMemo<ProxyHandler<TAttributes>>(() => {
    return {
      get(attributes, key) {
        if (!model || typeof key === 'symbol') return undefined;

        const attributeName = key as KeyOf<TAttributes>;

        if (attributeName in attributes) return attributes[attributeName];

        // @ts-expect-error but Model's get method is not typed correctly.
        attributes[attributeName] = model.get(attributeName);

        model.on(getChangeEvent(model, attributeName), handleChange);

        return attributes[attributeName];
      },

      set(attributes, key, value) {
        if (typeof key === 'symbol') return false;

        const attributeName = key as KeyOf<TAttributes>;

        if (attributeName in attributes) attributes[attributeName] = value;

        return Boolean(model?.set(attributeName, value, options));
      },

      deleteProperty(attributes, key) {
        if (typeof key === 'symbol') return false;

        const attributeName = key as KeyOf<TAttributes>;

        if (attributeName in attributes)
          // @ts-expect-error but TypeScript already handles this by not
          // allowing the 'delete' statement with non-optional properties.
          attributes[attributeName] = undefined;

        return Boolean(model?.unset(attributeName, options));
      },
    };
  }, [model, handleChange]);

  return useMemo(() => new Proxy(attributes, handlers), [attributes, handlers]);
}

export default useModelAttributes;
