/** Object without any property key. */
type EmptyObject = {
  [key: PropertyKey]: never;
};

export default EmptyObject;
