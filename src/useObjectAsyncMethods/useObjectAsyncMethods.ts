import { useMemo } from 'react';
import type { AnyAsyncFunction } from '../types';
import type ObjectAsyncMethodResult from './ObjectAsyncMethodResult';
import createEmptyObject from '../utils/createEmptyObject';
import useObjectAsyncMethodsState from './useObjectAsyncMethodsState';
import isObjectAsyncMethodKey, {
  ObjectAsyncMethodKey,
} from './isObjectAsyncMethodKey';
import createObjectAsyncMethodExecute, {
  ObjectAsyncMethodExecute,
} from './createObjectAsyncMethodExecute';
import ObjectAsyncMethodState, {
  INITIAL_OBJECT_ASYNC_METHOD_STATE,
} from './ObjectAsyncMethodState';

export type ObjectAsyncMethod<TAsyncMethod extends AnyAsyncFunction> =
  ObjectAsyncMethodState<ObjectAsyncMethodResult<TAsyncMethod>> & {
    execute: ObjectAsyncMethodExecute<TAsyncMethod>;
  };

export type ObjectAsyncMethods<TObject extends object> = {
  [TObjectKey in ObjectAsyncMethodKey<TObject>]: TObject[TObjectKey] extends AnyAsyncFunction
    ? ObjectAsyncMethod<TObject[TObjectKey]>
    : never;
};

function useObjectAsyncMethods<TObject extends object>(
  object: TObject,
): ObjectAsyncMethods<TObject> {
  const [state, dispatch] = useObjectAsyncMethodsState(object);

  // It persists the object async methods' 'execute' property.
  const methods = useMemo(
    () => createEmptyObject<ObjectAsyncMethods<TObject>>(),
    [object],
  );

  return useMemo(() => {
    return new Proxy<ObjectAsyncMethods<TObject>>(methods, {
      get(methods, key) {
        if (typeof key === 'symbol' || !isObjectAsyncMethodKey(object, key))
          throw new Error(`Can't handle "${String(key)}" as an async method.`);

        if (!methods[key]) {
          // @ts-expect-error because conditional type can't be solved without
          //                  a generic that represents the property value.
          methods[key] = {
            ...INITIAL_OBJECT_ASYNC_METHOD_STATE,
            execute: createObjectAsyncMethodExecute(dispatch, object, key),
          };
        } else {
          methods[key] = {
            ...methods[key],
            ...(state[key] ?? INITIAL_OBJECT_ASYNC_METHOD_STATE),
          };
        }

        return methods[key];
      },
    });
  }, [state, object]);
}

export default useObjectAsyncMethods;
