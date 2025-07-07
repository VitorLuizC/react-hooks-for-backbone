import type AnyAsyncFunction from '../types/AnyAsyncFunction';

/**
 * Result from object async method. It's an unwrapped value from the returned
 * `PromiseLike` object (e.g., `JQuery.jqXHR<TResult>` ou `Promise<TResult>`).
 */
type ObjectAsyncMethodResult<TAsyncMethod extends AnyAsyncFunction> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TAsyncMethod extends (this: any, ...args: any) => infer TPromise
    ? TPromise extends JQuery.jqXHR<infer TResult>
      ? TResult
      : TPromise extends PromiseLike<infer TResult>
        ? TResult
        : unknown
    : unknown;

export default ObjectAsyncMethodResult;
