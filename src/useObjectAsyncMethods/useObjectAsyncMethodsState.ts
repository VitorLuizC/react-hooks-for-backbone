import { useMemo, useReducer, Dispatch } from 'react';
import createEmptyObject from '../utils/createEmptyObject';
import type { AnyAsyncFunction } from '../types';
import type ObjectAsyncMethodResult from './ObjectAsyncMethodResult';
import type ObjectAsyncMethodState from './ObjectAsyncMethodState';
import ObjectAsyncMethodError from './ObjectAsyncMethodError';
import { ObjectAsyncMethodKey } from './isObjectAsyncMethodKey';

export type ObjectAsyncMethodsState<TObject extends object> = {
  [TObjectKey in ObjectAsyncMethodKey<TObject>]?: TObject[TObjectKey] extends AnyAsyncFunction
    ? ObjectAsyncMethodState<ObjectAsyncMethodResult<TObject[TObjectKey]>>
    : never;
};

export type ObjectAsyncMethodsAction<TObject extends object> =
  | { type: 'FAILED'; key: ObjectAsyncMethodKey<TObject>; cause: unknown }
  | { type: 'STARTED'; key: ObjectAsyncMethodKey<TObject> }
  | { type: 'COMPLETED'; key: ObjectAsyncMethodKey<TObject>; result: unknown };

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

export type ObjectAsyncMethodsDispatch<TObject extends object> =
  // Just the regular 'Dispatch' with object async methods actions.
  Dispatch<ObjectAsyncMethodsAction<TObject>>;

function useObjectAsyncMethodsState<TObject extends object>(
  object: TObject,
): readonly [
  state: ObjectAsyncMethodsState<TObject>,
  dispatch: ObjectAsyncMethodsDispatch<TObject>,
] {
  const state = useMemo(
    // It's created as empty object. The properties are only defined when object
    // async methods are executed.
    createEmptyObject<ObjectAsyncMethodsState<TObject>>,
    [object],
  );

  return useReducer(reducer as typeof reducer<TObject>, state);
}

export default useObjectAsyncMethodsState;
