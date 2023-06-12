import type { AnyAsyncFunction } from '../types';
import type ObjectAsyncMethodResult from './ObjectAsyncMethodResult';
import { ObjectAsyncMethodKey } from './isObjectAsyncMethodKey';
import type { ObjectAsyncMethodsDispatch } from './useObjectAsyncMethodsState';

export type ObjectAsyncMethodExecute<TAsyncMethod extends AnyAsyncFunction> = (
  ...args: Parameters<TAsyncMethod>
) => Promise<ObjectAsyncMethodResult<TAsyncMethod>>;

/** Creates an execute function that binds object async method with the store */
function createObjectAsyncMethodExecute<TObject extends object>(
  dispatch: ObjectAsyncMethodsDispatch<TObject>,
  object: TObject,
  objectKey: ObjectAsyncMethodKey<TObject>,
): ObjectAsyncMethodExecute<AnyAsyncFunction> {
  const method = object[objectKey];

  if (typeof method !== 'function')
    throw new Error(`Can't handle "${objectKey}" as an async method.`);

  // We're using 'any' because there aren't an easy way to type "'args' as the
  // parameters of the method whose key is 'key'".
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any[]) => {
    dispatch({
      key: objectKey,
      type: 'STARTED',
    });

    try {
      const result = await Promise.resolve(method.apply(object, args));

      dispatch({
        key: objectKey,
        type: 'COMPLETED',
        result,
      });

      return result;
    } catch (cause) {
      dispatch({
        key: objectKey,
        type: 'FAILED',
        cause,
      });

      throw cause;
    }
  };
}

export default createObjectAsyncMethodExecute;
