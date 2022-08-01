React.js Hooks for Backbone.js

# React.js Hooks for Backbone.js

## Table of contents

### Type Aliases

- [BackboneGetterFunction](README.md#backbonegetterfunction)
- [BackboneGetterOptions](README.md#backbonegetteroptions)

### Functions

- [useBackboneEventListener](README.md#usebackboneeventlistener)
- [useBackboneGetter](README.md#usebackbonegetter)

## Type Aliases

### BackboneGetterFunction

Ƭ **BackboneGetterFunction**<`TResult`, `TObject`, `TValues`\>: (`object`: `TObject`, ...`values`: `TValues`) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TObject` | extends `Events` |
| `TValues` | extends `unknown`[] = [] |

#### Type declaration

▸ (`object`, ...`values`): `TResult`

Function that uses a model, or a collection, and a list of values as
parameters to get the result.

**`Example`**

```ts
const getAvatar: GetterFunction<Model<User>, [AppDetails]> = (user, app) => {
  return `${app.baseUrl}/avatar/${user.get('companyId')}/${user.get('id')}`;
};
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `TObject` |
| `...values` | `TValues` |

##### Returns

`TResult`

#### Defined in

[useBackboneGetter.ts:18](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/e5b82ce/src/useBackboneGetter.ts#L18)

___

### BackboneGetterOptions

Ƭ **BackboneGetterOptions**<`TObject`, `TValues`\>: `Object`

Object that contains the model, or the collection, and a list values and
events to watch in order to get some heavy calculated result.

**`Example`**

```ts
const options: GetterOptions<Model<User>, [AppDetails]> = {
  model: user,
  watch: {
    values: [app],
    events: ['']
  }
}
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObject` | extends `Events` |
| `TValues` | extends `unknown`[] = [] |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `object` | `TObject` |
| `watch?` | { `events?`: `string`[] ; `values?`: `TValues`  } |
| `watch.events?` | `string`[] |
| `watch.values?` | `TValues` |

#### Defined in

[useBackboneGetter.ts:40](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/e5b82ce/src/useBackboneGetter.ts#L40)

## Functions

### useBackboneEventListener

▸ **useBackboneEventListener**<`TObject`\>(`object`, `eventOrEvents`, `callback`): `void`

React.js Hook that listens model's, or collection's, events and execute the
callback when they happen. It also pass model, or collection, as context to
the callback.

**`Example`**

```js
useListenTo(user, ['sync', 'change'], function (this: UserModel) {
  updatePermissions(this.get('roles'));
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TObject` | extends `Events`<`TObject`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `TObject` |
| `eventOrEvents` | `string` \| `string`[] |
| `callback` | (`this`: `TObject`, ...`args`: `unknown`[]) => `void` |

#### Returns

`void`

___

### useBackboneGetter

▸ **useBackboneGetter**<`TResult`, `TObject`, `TValues`\>(`getter`, `options`): `TResult`

React.js Hook that calculates a result derived from the received model, or
collection, and a list values. It's calculated on the first-render and
every time watched values change, or watched events are emitted.

**`Remarks`**

⚠️ it doesn't react to getter function's change, only to 'object' and the
watched 'values' and 'events'.

**`Example`**

```ts
type User = Model<{
  first_name: string;
  last_name: string;
}>;

function getFullName(user: User) {
  return user.get('first_name') + ' ' + user.get('last_name');
}

const fullName = useGetter(getFullName, {
  object: user,
  watch: {
    events: ['sync', 'change'],
  },
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TObject` | extends `Events`<`TObject`\> |
| `TValues` | extends `unknown`[] = [] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getter` | [`BackboneGetterFunction`](README.md#backbonegetterfunction)<`TResult`, `TObject`, `TValues`\> |
| `options` | [`BackboneGetterOptions`](README.md#backbonegetteroptions)<`TObject`, `TValues`\> |

#### Returns

`TResult`
