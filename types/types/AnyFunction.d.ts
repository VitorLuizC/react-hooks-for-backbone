/**
 * Function that has any context, arguments, and result.
 *
 * Commonly used as a constraint for generic types since 'Function' only works
 * as a constructor in TypeScript's type system.
 */
declare type AnyFunction = (this: any, ...args: any) => any;
export default AnyFunction;
//# sourceMappingURL=AnyFunction.d.ts.map