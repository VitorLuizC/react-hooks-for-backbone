/** Creates an empty object without 'Object' as prototype. */
function createEmptyObject<TObject extends object>(): TObject {
  return Object.create(null);
}

export default createEmptyObject;
