/** Creates an empty object without 'Object' as prototype. */
function getEmptyObject<TObject extends object>(): TObject {
  return Object.create(null);
}

export default getEmptyObject;
