import { useCallback, useRef } from 'react';
import type AnyFunction from '../types/AnyFunction.js';

/**
 * React.js Hook that provides a handler function that persists its reference,
 * but calls the most recent received callback.
 *
 * @example
 *
 * ```js
 * const Button = memo(ui.Button);
 *
 * function Count() {
 *   const [count, setCount] = useState(0);
 *
 *   const handleClick = useHandler(() => {
 *     setCount(count + 1);
 *   });
 *
 *   // This Button won't re-render because its props' values never change.
 *   return (
 *     <>
 *       Count: {count}
 *       <Button onClick={handleClick}>+1</Button>
 *     </>
 *   );
 * }
 * ```
 */
function useHandler<THandler extends AnyFunction>(handler: THandler): THandler {
  const handlerRef = useRef(handler);

  handlerRef.current = handler;

  function executeHandler(this: ThisType<THandler>) {
    // 'Function.prototype.apply' requires an ArrayLike, so 'arguments' is fine.
    // eslint-disable-next-line prefer-rest-params
    return handlerRef.current.apply(this, arguments as Parameters<THandler>);
  }

  return useCallback<THandler>(executeHandler as THandler, []);
}

export default useHandler;
