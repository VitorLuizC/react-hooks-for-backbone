/** Union between string keys of received object. */
type KeyOf<TObject extends object> = string & keyof TObject;

export default KeyOf;
