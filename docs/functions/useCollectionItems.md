[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / useCollectionItems

# Function: useCollectionItems()

> **useCollectionItems**\<`TModel`\>(`collection`, `options`): `TModel`[]

Defined in: [useCollectionItems/useCollectionItems.ts:61](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useCollectionItems/useCollectionItems.ts#L61)

React.js Hook that provides an array of Backbone Models from a collection. It
also watches received events from the collection and related objects to keep
the array synchronized with the collection.

By default it watches the `"update"` event, but it can be overridden.

## Type Parameters

### TModel

`TModel` *extends* `Model`\<`any`, `ModelSetOptions`, `any`\> = `Model`\<`any`, `ModelSetOptions`, `any`\>

## Parameters

### collection

`Collection`\<`TModel`\>

### options

[`UseCollectionItemsOptions`](../type-aliases/UseCollectionItemsOptions.md) = `{}`

## Returns

`TModel`[]

## Examples

Using the hook to sync component with the collection and its models' names.

```jsx
useCollection(users, { watchEvents: ['change:name', 'update'] });

return <ListUsersNames usersNames={users.collect('name')} />;
```

Using the array returned by the hook to show the collection's models.

```jsx
const friends = useCollection(user.friends(), {
  watchRelatedEvents: [user, 'change:friends_ids'],
});

return (
  <ul className="UserFriendsList">
    {!friends.length && <UserFriendsListEmpty />}

    {friends.map((friend) => (
      <UserFriendsListItem key={friend.id} friend={friend} />
    ))}
  </ul>
)
```
