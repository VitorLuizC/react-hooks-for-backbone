React.js Hooks for Backbone.js

# React.js Hooks for Backbone.js

## Table of contents

### Type Aliases

- [BackboneAttributeOptions](README.md#backboneattributeoptions)
- [BackboneAttributeUpdate](README.md#backboneattributeupdate)
- [BackboneEventSubject](README.md#backboneeventsubject)
- [BackboneEventSubjects](README.md#backboneeventsubjects)
- [BackboneGetterFunction](README.md#backbonegetterfunction)
- [BackboneGetterOptions](README.md#backbonegetteroptions)

### Functions

- [useBackboneAttribute](README.md#usebackboneattribute)
- [useBackboneEventListener](README.md#usebackboneeventlistener)
- [useBackboneGetter](README.md#usebackbonegetter)
- [useBackboneListenTo](README.md#usebackbonelistento)

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
  watchEvents: ['rename', 'change:name'],
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
| `watchEvents?` | `string`[] |
| `watchRelatedEvents?` | [`BackboneEventSubjects`](README.md#backboneeventsubjects) |

#### Defined in

[useBackboneAttribute.ts:58](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneAttribute.ts#L58)

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

[useBackboneAttribute.ts:33](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneAttribute.ts#L33)

___

### BackboneEventSubject

Ƭ **BackboneEventSubject**: [object: Events, events: string[]]

Tuple that contains a model, or a collection, and the event names to listen
from it in [useBackboneListenTo](README.md#usebackbonelistento) hook.

**`Example`**

```ts
const user = new Backbone.Model<UserAttributes>({ id });

const subject: BackboneEventSubject = [
  user,
  'change:name',
  'change:email',
];
```

#### Defined in

[useBackboneListenTo.ts:22](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneListenTo.ts#L22)

___

### BackboneEventSubjects

Ƭ **BackboneEventSubjects**: [`BackboneEventSubject`](README.md#backboneeventsubject) \| [`BackboneEventSubject`](README.md#backboneeventsubject)[]

Union between a single [BackboneEventSubject](README.md#backboneeventsubject) and a list of it.

**`Example`**

```ts
const user = new Backbone.Model<UserAttributes>({ id });

const subject: BackboneEventSubjects = [
  user,
  'change:name',
  'change:email',
];

// or

const subjects: BackboneEventSubjects = [
  [user, 'change:name'],
  [user, 'change:email', 'change:email_confirmation'],
];
```

#### Defined in

[useBackboneListenTo.ts:46](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneListenTo.ts#L46)

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

[useBackboneGetter.ts:23](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneGetter.ts#L23)

___

### BackboneGetterOptions

Ƭ **BackboneGetterOptions**<`TObject`, `TValues`\>: `Object`

Object that contains a model, or a acollection, and a list values and
events to watch in order to get the result.

**`Example`**

```ts
const options: BackboneGetterOptions<Model<User>, [AppDetails]> = {
  object: user,
  watchEvents: ['change:companyId'],
  watchValues: [app],
  watchRelatedEvents: [app, 'change:base_url'],
};
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
| `watchEvents?` | `string`[] |
| `watchRelatedEvents?` | [`BackboneEventSubjects`](README.md#backboneeventsubjects) |
| `watchValues?` | `TValues` |

#### Defined in

[useBackboneGetter.ts:44](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneGetter.ts#L44)

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
  watchEvents: ['change:name', 'sync', 'rename'],
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

[useBackboneAttribute.ts:91](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneAttribute.ts#L91)

___

### useBackboneEventListener

▸ **useBackboneEventListener**<`TObject`\>(`object`, `eventOrEvents`, `callback`): `void`

React.js Hook that listens object's events and executes the callback when
they happen. The object can be a Backbone Model, a Backbone Collection or
any Backbone object that implement its events interface.

**`Example`**

```js
useBackboneEventListener(user, ['change'], function (this: UserModel) {
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

[useBackboneEventListener.ts:18](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneEventListener.ts#L18)

___

### useBackboneGetter

▸ **useBackboneGetter**<`TResult`, `TObject`, `TValues`\>(`getter`, `options`): `TResult`

React.js Hook that calculates a result derived from the received model, or
collection, and the watched list of values. It's calculated on the
first-render and every time watched values changes, or events are triggered.

**`Remarks`**

⚠️ it doesn't react to `getter` function's change. So it doesn't have to be
defined using `useCallback` or `useMemo`.

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
  watchEvents: ['sync', 'change'],
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

[useBackboneGetter.ts:82](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneGetter.ts#L82)

___

### useBackboneListenTo

▸ **useBackboneListenTo**(`subjectOrSubjects`, `callback`): `void`

React.js Hook that listens the received objects' events and execute callback
when they happen.

**`Example`**

```js
const subjects = [
  [user, 'sync', 'change:roles'],
  [company, 'sync', 'change:roles_configuration'],
  [roles, 'sync'],
];

useBackboneListenTo(subjects, updateUserPermissions);

// or

useBackboneListenTo(
  [user, 'change:permissions'],
  updateUserPermissions,
);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `subjectOrSubjects` | [`BackboneEventSubjects`](README.md#backboneeventsubjects) |
| `callback` | `AnyFunction` |

#### Returns

`void`

#### Defined in

[useBackboneListenTo.ts:73](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/8a56353/src/useBackboneListenTo.ts#L73)
