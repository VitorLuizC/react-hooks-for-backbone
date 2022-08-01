React.js Hooks for Backbone.js

# React.js Hooks for Backbone.js

## Table of contents

### Type Aliases

- [BackboneAttributeOptions](README.md#backboneattributeoptions)
- [BackboneAttributeUpdate](README.md#backboneattributeupdate)
- [BackboneGetterFunction](README.md#backbonegetterfunction)
- [BackboneGetterOptions](README.md#backbonegetteroptions)

### Functions

- [useBackboneAttribute](README.md#usebackboneattribute)
- [useBackboneEventListener](README.md#usebackboneeventlistener)
- [useBackboneGetter](README.md#usebackbonegetter)

## Type Aliases

### BackboneAttributeOptions

Ƭ **BackboneAttributeOptions**<`TAttributes`, `TKey`, `TOptions`\>: `Object`

Object that contains the attribute key, its model and a list of events to
watch in order to keep its value synchronized.

**`Example`**

```ts
const options = {
  key: 'name',
  model: user,
  watch: {
    events: ['rename', 'change:name'],
  },
} as BackboneAttributeOptions<UserAttributes, 'name'>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TAttributes` | `TAttributes` |
| `TKey` | extends `string` & keyof `TAttributes` |
| `TOptions` | `ModelSetOptions` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `TKey` |
| `model` | `Model`<`TAttributes`, `TOptions`\> |
| `watch?` | { `events?`: `string`[]  } |
| `watch.events?` | `string`[] |

#### Defined in

[useBackboneAttribute.ts:57](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneAttribute.ts#L57)

___

### BackboneAttributeUpdate

Ƭ **BackboneAttributeUpdate**<`TAttributes`, `TKey`, `TOptions`\>: (`newValueOrFunction`: `TAttributes`[`TKey`] \| (`value`: `NonNullable`<`TAttributes`[`TKey`]\> \| ``null``) => `TAttributes`[`TKey`], `options?`: `TOptions`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TAttributes` | `TAttributes` |
| `TKey` | extends `string` & keyof `TAttributes` |
| `TOptions` | `ModelSetOptions` |

#### Type declaration

▸ (`newValueOrFunction`, `options?`): `void`

Function that receives two arguments: The first can be both the new
attribute value, or a function that receives previous attribute value and
returns the new one; and the second one is the Models' set options.

**`Example`**

```ts
let setUserName: BackboneAttributeUpdate<
  UserAttributes,
  'name',
>;

setUserName('Unkown', {
  validate: true,
});

// or

setUserName((previousName) => previousName?.trim() ?? 'Uknown', {
  validate: true,
});
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValueOrFunction` | `TAttributes`[`TKey`] \| (`value`: `NonNullable`<`TAttributes`[`TKey`]\> \| ``null``) => `TAttributes`[`TKey`] |
| `options?` | `TOptions` |

##### Returns

`void`

#### Defined in

[useBackboneAttribute.ts:30](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneAttribute.ts#L30)

___

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
let getAvatar: BackboneGetterFunction<Model<User>, [AppDetails]>;

getAvatar = (user, app) => {
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

[useBackboneGetter.ts:20](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneGetter.ts#L20)

___

### BackboneGetterOptions

Ƭ **BackboneGetterOptions**<`TObject`, `TValues`\>: `Object`

Object that contains the model, or the collection, and a list values and
events to watch in order to get some heavy calculated result.

**`Example`**

```ts
const options: BackboneGetterOptions<Model<User>, [AppDetails]> = {
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

[useBackboneGetter.ts:42](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneGetter.ts#L42)

## Functions

### useBackboneAttribute

▸ **useBackboneAttribute**<`TAttributes`, `TKey`, `TOptions`\>(`options`): [value: NonNullable<TAttributes[TKey]\> \| null, setValue: BackboneAttributeUpdate<TAttributes, TKey, TOptions\>]

React.js Hook that provides the Backbone Models' attribute value and a
function to update it. It also watches received events to keep its value
synchronized with the model.

**`Example`**

```ts
const [name, setName] = useBackboneAttribute({
  key: 'name',
  model: user,
  watch: {
    events: ['change:name', 'sync', 'rename'],
  },
});

const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
  setName(event.target.value);
};

return <input value={name} onChange={handleChange} />;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TAttributes` | `TAttributes` |
| `TKey` | extends `string` |
| `TOptions` | `ModelSetOptions` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`BackboneAttributeOptions`](README.md#backboneattributeoptions)<`TAttributes`, `TKey`, `TOptions`\> |

#### Returns

[value: NonNullable<TAttributes[TKey]\> \| null, setValue: BackboneAttributeUpdate<TAttributes, TKey, TOptions\>]

#### Defined in

[useBackboneAttribute.ts:93](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneAttribute.ts#L93)

___

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

#### Defined in

[useBackboneEventListener.ts:18](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneEventListener.ts#L18)

___

### useBackboneGetter

▸ **useBackboneGetter**<`TResult`, `TObject`, `TValues`\>(`getter`, `options`): `TResult`

React.js Hook that calculates a result derived from the received model, or
collection, and a list values. It's calculated on the first-render and
every time watched values change, or watched events are emitted.

**`Remarks`**

⚠️ it doesn't react to `getter` function's change, only to `object` and the
watched `values` and `events`' changes.

**`Example`**

```ts
type User = Model<{
  first_name: string;
  last_name: string;
}>;

function getFullName(user: User) {
  return user.get('first_name') + ' ' + user.get('last_name');
}

const fullName = useBackboneGetter(getFullName, {
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

#### Defined in

[useBackboneGetter.ts:83](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/20f5552/src/useBackboneGetter.ts#L83)
