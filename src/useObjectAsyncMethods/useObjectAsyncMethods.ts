import { useMemo } from 'react';
import type { AnyAsyncFunction, KeyOf } from '../types';
import createEmptyObject from '../utils/createEmptyObject';
import type ObjectAsyncMethodResult from './ObjectAsyncMethodResult';
import useObjectAsyncMethodsState from './useObjectAsyncMethodsState';
import type ObjectAsyncMethodState from './ObjectAsyncMethodState';

export type ObjectAsyncMethodKey<TObject extends object> = {
  readonly [TObjectKey in KeyOf<TObject>]: TObject[TObjectKey] extends AnyAsyncFunction
    ? TObjectKey
    : never;
}[KeyOf<TObject>];

export type ObjectAsyncMethodExecute<TAsyncMethod extends AnyAsyncFunction> = (
  ...args: Parameters<TAsyncMethod>
) => Promise<ObjectAsyncMethodResult<TAsyncMethod>>;

export type ObjectAsyncMethod<TAsyncMethod extends AnyAsyncFunction> =
  ObjectAsyncMethodState<ObjectAsyncMethodResult<TAsyncMethod>> & {
    readonly execute: ObjectAsyncMethodExecute<TAsyncMethod>;
  };

export type ObjectAsyncMethods<TObject extends object> = {
  readonly [TObjectKey in ObjectAsyncMethodKey<TObject>]: TObject[TObjectKey] extends AnyAsyncFunction
    ? ObjectAsyncMethod<TObject[TObjectKey]>
    : never;
};

function isObjectAsyncMethodKey<TObject extends object>(
  object: TObject,
  key: string,
): key is KeyOf<TObject> {
  return key in object && typeof object[key as keyof TObject] === 'function';
}

function useObjectAsyncMethods<TObject extends object>(
  object: TObject,
): ObjectAsyncMethods<TObject> {
  const [state, dispatch] = useObjectAsyncMethodsState(object);

  return useMemo(() => {
    return new Proxy<ObjectAsyncMethods<TObject>>(createEmptyObject(), {
      get(_, key) {
        if (typeof key === 'symbol')
          throw new Error(`Can't get "${String(key)}" as async method`);

        if (!isObjectAsyncMethodKey(object, key))
          throw new Error(
            `Can't get "${key}" as async method because it isn't a function`,
          );

        return {
          error: state[key]?.error ?? null,
          result: state[key]?.result ?? null,
          status: state[key]?.status ?? 'idle',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async execute(...args: any[]) {
            dispatch({
              key,
              type: 'STARTED',
            });

            try {
              const result = await Promise.resolve(
                (object[key] as AnyAsyncFunction).apply(object, args),
              );

              dispatch({
                key,
                result,
                type: 'COMPLETED',
              });

              return result;
            } catch (cause) {
              dispatch({
                key,
                cause,
                type: 'FAILED',
              });

              throw cause;
            }
          },
        };
      },
    });
  }, [state, object]);
}

export default useObjectAsyncMethods;
