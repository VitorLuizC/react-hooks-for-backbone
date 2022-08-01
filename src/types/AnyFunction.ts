/**
 * Function that has any context, arguments, and result.
 *
 * Commonly used as a constraint for generic types since 'Function' only works
 * as a constructor in TypeScript's type system.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (this: any, ...args: any) => any;

export default AnyFunction;
