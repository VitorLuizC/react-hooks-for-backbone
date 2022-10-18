import equal from 'lodash.isequal';
import type KeyOf from '../types/KeyOf';

/** Gets the changes between two objects. */
function getChanges<TObject extends object>(
  objectA: Partial<TObject>,
  objectB: Partial<TObject>,
): Partial<TObject> {
  const wasDifferent = ([key, value]: [string, unknown]) => {
    return key in objectA && !equal(value, objectA[key as KeyOf<TObject>]);
  };

  const entries = Object.entries(objectB).filter(wasDifferent);

  return Object.fromEntries(entries) as Partial<TObject>;
}

export default getChanges;
