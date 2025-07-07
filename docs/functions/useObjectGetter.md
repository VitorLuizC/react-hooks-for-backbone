[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / useObjectGetter

# Function: useObjectGetter()

> **useObjectGetter**\<`TResult`, `TObject`, `TValues`\>(`getter`, `options`): `TResult`

Defined in: [useObjectGetter/useObjectGetter.ts:84](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectGetter/useObjectGetter.ts#L84)

React.js Hook that calculates a result derived from the received model, or
collection, and the watched list of values. It's calculated on the
first-render and every time watched values changes, or events are triggered.

## Type Parameters

### TResult

`TResult`

### TObject

`TObject` *extends* `undefined` \| `null` \| `Events`

### TValues

`TValues` *extends* `unknown`[] = \[\]

## Parameters

### getter

[`UseObjectGetterFunction`](../type-aliases/UseObjectGetterFunction.md)\<`TResult`, `TObject`, `TValues`\>

### options

[`UseObjectGetterOptions`](../type-aliases/UseObjectGetterOptions.md)\<`TObject`, `TValues`\>

## Returns

`TResult`

## Remarks

⚠️ it doesn't react to `getter` function's change. So it doesn't have to be
defined using `useCallback` or `useMemo`.

## Example

```ts
type User = Model<{
  first_name: string;
  last_name: string;
}>;

function getFullName(user: User) {
  return user.get('first_name') + ' ' + user.get('last_name');
}

const fullName = useObjectGetter(getFullName, {
  object: user,
  watchEvents: ['sync', 'change'],
});
```
