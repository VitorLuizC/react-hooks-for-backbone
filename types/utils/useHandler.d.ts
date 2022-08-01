import type AnyFunction from '../types/AnyFunction';
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
declare function useHandler<THandler extends AnyFunction>(handler: THandler): THandler;
export default useHandler;
//# sourceMappingURL=useHandler.d.ts.map