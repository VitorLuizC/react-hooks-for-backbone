import type { Events } from 'backbone';
/**
 * React.js Hook that listens model's, or collection's, events and execute the
 * callback when they happen. It also pass model, or collection, as context to
 * the callback.
 *
 * @example
 *
 * ```js
 * useListenTo(user, ['sync', 'change'], function (this: UserModel) {
 *   updatePermissions(this.get('roles'));
 * });
 * ```
 */
declare function useBackboneEventListener<TObject extends Events>(object: TObject, eventOrEvents: string | string[], callback: (this: TObject, ...args: unknown[]) => void): void;
export default useBackboneEventListener;
//# sourceMappingURL=useBackboneEventListener.d.ts.map