/**
 * Function that has any context, arguments, and result in a 'PromiseLike'.
 *
 * Similar to {@link AnyFunction}.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyAsyncFunction = (this: any, ...args: any) => PromiseLike<any>;

export default AnyAsyncFunction;
