import type { AnyAsyncFunction, KeyOf } from '../types';

/** Union between object async method keys. */
export type ObjectAsyncMethodKey<TObject extends object> = {
  readonly [TObjectKey in KeyOf<TObject>]: TObject[TObjectKey] extends AnyAsyncFunction
    ? TObjectKey
    : never;
}[KeyOf<TObject>];

/** Checks if object key is a method of the object. */
function isObjectAsyncMethodKey<TObject extends object>(
  object: TObject,
  objectKey: string,
): objectKey is ObjectAsyncMethodKey<TObject> {
  return (
    typeof objectKey === 'string' &&
    objectKey in object &&
    typeof object[objectKey as KeyOf<TObject>] === 'function'
  );
}

export default isObjectAsyncMethodKey;
