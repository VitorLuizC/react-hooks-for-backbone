import { useMemo, useReducer } from 'react';
import createEmptyObject from '../utils/createEmptyObject';
import type { AnyAsyncFunction, KeyOf } from '../types';
import type ObjectAsyncMethodResult from './ObjectAsyncMethodResult';
import ObjectAsyncMethodError from './ObjectAsyncMethodError';

/** State for the object async method. */
export type ObjectAsyncMethodState<TResult> =
  | { status: 'failed'; error: Error; result: null }
  | { status: 'pending'; error: Error | null; result: TResult | null }
  | { status: 'completed'; error: null; result: TResult };

/** State for the object async methods. */
export type ObjectAsyncMethodsState<TObject extends object> = {
  [TObjectKey in KeyOf<TObject>]?: TObject[TObjectKey] extends AnyAsyncFunction
    ? ObjectAsyncMethodState<ObjectAsyncMethodResult<TObject[TObjectKey]>>
    : never;
};

/** Union between actions for the object async methods. */
export type ObjectAsyncMethodsAction<TObject extends object> =
  | { type: 'FAILED'; key: KeyOf<TObject>; cause: unknown }
  | { type: 'STARTED'; key: KeyOf<TObject> }
  | { type: 'COMPLETED'; key: KeyOf<TObject>; result: unknown };

/** Reducer for the object async methods. */
function reducer<TObject extends object>(
  state: ObjectAsyncMethodsState<TObject>,
  action: ObjectAsyncMethodsAction<TObject>,
): ObjectAsyncMethodsState<TObject> {
  switch (action.type) {
    case 'FAILED':
      return {
        ...state,
        [action.key]: {
          error:
            action.cause instanceof Error
              ? action.cause
              : new ObjectAsyncMethodError(action.key, action.cause),
          status: 'failed',
          result: null,
        },
      };
    case 'STARTED':
      return {
        ...state,
        [action.key]: {
          error: state[action.key]?.error ?? null,
          status: 'pending',
          result: state[action.key]?.result ?? null,
        },
      };
    default:
      return {
        ...state,
        [action.key]: {
          error: null,
          status: 'completed',
          result: action.result,
        },
      };
  }
}

function useObjectAsyncMethodsState<TObject extends object>(object: TObject) {
  const state = useMemo(
    // It's an empty object, only filled when async methods are called.
    createEmptyObject<ObjectAsyncMethodsState<TObject>>,
    [object],
  );

  return useReducer(reducer as typeof reducer<TObject>, state);
}

export default useObjectAsyncMethodsState;
