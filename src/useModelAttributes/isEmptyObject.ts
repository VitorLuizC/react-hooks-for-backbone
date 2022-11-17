import type { EmptyObject } from '../types';

/** Checks if received object is empty. */
function isEmptyObject(object: object): object is EmptyObject {
  const keys = Object.keys(object);
  return !keys.length;
}

export default isEmptyObject;
