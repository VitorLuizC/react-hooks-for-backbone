[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / UseObjectGetterOptions

# Type Alias: UseObjectGetterOptions\<TObject, TValues\>

> **UseObjectGetterOptions**\<`TObject`, `TValues`\> = `object`

Defined in: [useObjectGetter/useObjectGetter.ts:46](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectGetter/useObjectGetter.ts#L46)

Object that contains a model, or a acollection, and a list values and
events to watch in order to get the result.

## Example

```ts
const options: UseObjectGetterOptions<Model<User>, [AppDetails]> = {
  object: user,
  watchEvents: ['change:companyId'],
  watchValues: [app],
  watchRelatedEvents: [app, 'change:base_url'],
};
```

## Type Parameters

### TObject

`TObject` *extends* `Events` \| `undefined` \| `null`

### TValues

`TValues` *extends* `unknown`[] = \[\]

## Properties

### object

> **object**: `TObject`

Defined in: [useObjectGetter/useObjectGetter.ts:50](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectGetter/useObjectGetter.ts#L50)

***

### watchEvents?

> `optional` **watchEvents**: `string`[]

Defined in: [useObjectGetter/useObjectGetter.ts:51](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectGetter/useObjectGetter.ts#L51)

***

### watchRelatedEvents?

> `optional` **watchRelatedEvents**: [`ObjectEvents`](ObjectEvents.md) \| [`ObjectsEvents`](ObjectsEvents.md)

Defined in: [useObjectGetter/useObjectGetter.ts:53](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectGetter/useObjectGetter.ts#L53)

***

### watchValues?

> `optional` **watchValues**: `TValues`

Defined in: [useObjectGetter/useObjectGetter.ts:52](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectGetter/useObjectGetter.ts#L52)
