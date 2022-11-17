// @ts-check

import type { Collection, Model } from 'backbone';
import { useObjectGetter } from '../useObjectGetter';
import type { ObjectEvents, ObjectsEvents } from '../useObjectsEventsListeners';

/**
 * Object that contains the collection, a list of events and a list of related
 * events from other objects to watch in order to keep it synchronized.
 *
 * @example
 *
 * ```ts
 * const options: UseCollectionOptions = {
 *   watchEvents: ['add', 'sync', 'remove'],
 *   watchRelatedEvents: [permissions, 'change:add_users'],
 * };
 * ```
 */
export type UseCollectionOptions = {
  /** Events to watch from the collection. Defaults to `['update']`. */
  watchEvents?: string[];
  watchRelatedEvents?: ObjectEvents | ObjectsEvents;
};

/**
 * React.js Hook that provides an array of Backbone Models from a collection. It
 * also watches received events from the collection and related objects to keep
 * the array synchronized with the collection.
 *
 * By default it watches the `"update"` event, but it can be overridden.
 *
 * @example
 *
 * Using the hook to sync component with the collection and its models' names.
 *
 * ```jsx
 * useCollection(users, { watchEvents: ['change:name', 'update'] });
 *
 * return <ListUsersNames usersNames={users.collect('name')} />;
 * ```
 *
 * @example
 *
 * Using the array returned by the hook to show the collection's models.
 *
 * ```jsx
 * const friends = useCollection(user.friends(), {
 *   watchRelatedEvents: [user, 'change:friends_ids'],
 * });
 *
 * return (
 *   <ul className="UserFriendsList">
 *     {!friends.length && <UserFriendsListEmpty />}
 *
 *     {friends.map((friend) => (
 *       <UserFriendsListItem key={friend.id} friend={friend} />
 *     ))}
 *   </ul>
 * )
 * ```
 */
function useCollection<TModel extends Model = Model>(
  collection: Collection<TModel>,
  options: UseCollectionOptions = {},
): TModel[] {
  const { watchEvents = ['update'], watchRelatedEvents } = options;

  return useObjectGetter((collection) => collection.toArray(), {
    object: collection,
    watchEvents,
    watchRelatedEvents,
  });
}

export default useCollection;
