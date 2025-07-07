[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / UseCollectionItemsOptions

# Type Alias: UseCollectionItemsOptions

> **UseCollectionItemsOptions** = `object`

Defined in: [useCollectionItems/useCollectionItems.ts:18](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useCollectionItems/useCollectionItems.ts#L18)

Object that contains the collection, a list of events and a list of related
events from other objects to watch in order to keep it synchronized.

## Example

```ts
const options: UseCollectionOptions = {
  watchEvents: ['add', 'sync', 'remove'],
  watchRelatedEvents: [permissions, 'change:add_users'],
};
```

## Properties

### watchEvents?

> `optional` **watchEvents**: `string`[]

Defined in: [useCollectionItems/useCollectionItems.ts:20](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useCollectionItems/useCollectionItems.ts#L20)

Events to watch from the collection. Defaults to `['update']`.

***

### watchRelatedEvents?

> `optional` **watchRelatedEvents**: [`ObjectEvents`](ObjectEvents.md) \| [`ObjectsEvents`](ObjectsEvents.md)

Defined in: [useCollectionItems/useCollectionItems.ts:21](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useCollectionItems/useCollectionItems.ts#L21)
