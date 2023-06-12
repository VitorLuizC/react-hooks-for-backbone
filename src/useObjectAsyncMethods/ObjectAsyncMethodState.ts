/** State of an object async method. */
type ObjectAsyncMethodState<TResult> =
  | {
      error: null;
      result: null;
      status: 'idle';
    }
  | {
      error: Error;
      result: null;
      status: 'failed';
    }
  | {
      error: Error | null;
      result: TResult | null;
      status: 'pending';
    }
  | {
      error: null;
      result: TResult;
      status: 'completed';
    };

export const INITIAL_OBJECT_ASYNC_METHOD_STATE: ObjectAsyncMethodState<never> =
  {
    error: null,
    result: null,
    status: 'idle',
  };

export default ObjectAsyncMethodState;
