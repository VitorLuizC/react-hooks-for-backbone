/** State of an object async method. */
type ObjectAsyncMethodState<TResult> =
  | {
      readonly error: null;
      readonly result: null;
      readonly status: 'idle';
    }
  | {
      readonly error: Error;
      readonly result: null;
      readonly status: 'failed';
    }
  | {
      readonly error: Error | null;
      readonly result: TResult | null;
      readonly status: 'pending';
    }
  | {
      readonly error: null;
      readonly result: TResult;
      readonly status: 'completed';
    };

export default ObjectAsyncMethodState;
