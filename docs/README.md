React.js Hooks for Backbone.js

# React.js Hooks for Backbone.js

## Table of contents

### Type Aliases

- [AnyFunction](README.md#anyfunction)
- [ObjectEvents](README.md#objectevents)
- [ObjectsEvents](README.md#objectsevents)
- [UseModelAttributeOptions](README.md#usemodelattributeoptions)
- [UseModelAttributeSet](README.md#usemodelattributeset)
- [UseObjectGetterFunction](README.md#useobjectgetterfunction)
- [UseObjectGetterOptions](README.md#useobjectgetteroptions)

### Functions

- [useModelAttribute](README.md#usemodelattribute)
- [useModelAttributes](README.md#usemodelattributes)
- [useObjectEventListener](README.md#useobjecteventlistener)
- [useObjectGetter](README.md#useobjectgetter)
- [useObjectsEventsListeners](README.md#useobjectseventslisteners)

## Type Aliases

### AnyFunction

Ƭ **AnyFunction**: (`this`: `any`, ...`args`: `any`) => `any`

#### Type declaration

▸ (`this`, ...`args`): `any`

Function that has any context, arguments, and result.

Commonly used as a constraint for generic types since 'Function' only works
as a constructor in TypeScript's type system.

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `any` |
| `...args` | `any` |

##### Returns

`any`

#### Defined in

[types/AnyFunction.ts:8](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/types/AnyFunction.ts#L8)

___

### ObjectEvents

Ƭ **ObjectEvents**: [object: Events, events: string[]]

Tuple that contains a model, or a collection, and the event names to listen
from it in [useObjectsEventsListeners](README.md#useobjectseventslisteners) hook.

**`Example`**

```ts
const user = new Backbone.Model<UserAttributes>({ id });

const subject: ObjectEvents = [
  user,
  'change:name',
  'change:email',
  'change:email_confirmation'
];
```

#### Defined in

[useObjectsEventsListeners/useObjectsEventsListeners.ts:23](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L23)

___

### ObjectsEvents

Ƭ **ObjectsEvents**: [`ObjectEvents`](README.md#objectevents)[]

List of [ObjectEvents](README.md#objectevents).

**`Example`**

```ts
const user = new Backbone.Model<UserAttributes>({ id });

const subjects: ObjectsEvents = [
  [user, 'change:name'],
  [user, 'change:email', 'change:email_confirmation'],
];
```

#### Defined in

[useObjectsEventsListeners/useObjectsEventsListeners.ts:39](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L39)

___

### UseModelAttributeOptions

Ƭ **UseModelAttributeOptions**<`TAttributes`, `TAttributeName`, `TOptions`\>: `Object`

Object that contains the attribute key, its model and a list of events to
watch in order to keep its value synchronized.

**`Example`**

```ts
const options = {
  name: 'name',
  model: user,
  watchEvents: ['rename', 'change:name'],
} as UseModelAttributeOptions<UserAttributes, 'name'>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TAttributes` | extends `object` |
| `TAttributeName` | extends `KeyOf`<`TAttributes`\> |
| `TOptions` | `ModelSetOptions` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `model` | `Model`<`TAttributes`, `TOptions`\> |
| `name` | `TAttributeName` |
| `watchEvents?` | `string`[] |
| `watchRelatedEvents?` | [`ObjectEvents`](README.md#objectevents) \| [`ObjectsEvents`](README.md#objectsevents) |

#### Defined in

[useModelAttribute/useModelAttribute.ts:62](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useModelAttribute/useModelAttribute.ts#L62)

___

### UseModelAttributeSet

Ƭ **UseModelAttributeSet**<`TAttributes`, `TAttributeName`, `TOptions`\>: (`newValueOrFunction`: `TAttributes`[`TAttributeName`] \| (`value?`: `TAttributes`[`TAttributeName`]) => `TAttributes`[`TAttributeName`], `options?`: `TOptions`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TAttributes` | extends `object` |
| `TAttributeName` | extends `KeyOf`<`TAttributes`\> |
| `TOptions` | `ModelSetOptions` |

#### Type declaration

▸ (`newValueOrFunction`, `options?`): `void`

Function that receives two arguments:
- The first can be both the new attribute value, or a function that receives
previous attribute value and returns the new one;
- The second one is the Models' set options, which is optional.

**`Example`**

```ts
declare const setUserName: UseModelAttributeSet<
  UserAttributes,
  'name',
>;

setUserName('Unkown', {
  validate: true,
});

// or

setUserName((previousName) => previousName?.trim() ?? 'Uknown', {
  silent: true,
});
```

##### Parameters

| Name | Type |
| :------ | :------ |
| `newValueOrFunction` | `TAttributes`[`TAttributeName`] \| (`value?`: `TAttributes`[`TAttributeName`]) => `TAttributes`[`TAttributeName`] |
| `options?` | `TOptions` |

##### Returns

`void`

#### Defined in

[useModelAttribute/useModelAttribute.ts:37](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useModelAttribute/useModelAttribute.ts#L37)

___

### UseObjectGetterFunction

Ƭ **UseObjectGetterFunction**<`TResult`, `TObject`, `TValues`\>: (`object`: `TObject`, ...`values`: `TValues`) => `TResult`

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
let getAvatar: UseObjectGetterFunction<Model<User>, [AppDetails]>;

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

[useObjectGetter/useObjectGetter.ts:25](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectGetter/useObjectGetter.ts#L25)

___

### UseObjectGetterOptions

Ƭ **UseObjectGetterOptions**<`TObject`, `TValues`\>: `Object`

Object that contains a model, or a acollection, and a list values and
events to watch in order to get the result.

**`Example`**

```ts
const options: UseObjectGetterOptions<Model<User>, [AppDetails]> = {
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
| `watchRelatedEvents?` | [`ObjectEvents`](README.md#objectevents) \| [`ObjectsEvents`](README.md#objectsevents) |
| `watchValues?` | `TValues` |

#### Defined in

[useObjectGetter/useObjectGetter.ts:46](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectGetter/useObjectGetter.ts#L46)

## Functions

### useModelAttribute

▸ **useModelAttribute**<`TAttributes`, `TAttributeName`, `TOptions`\>(`options`): [value: TAttributes[TAttributeName] \| undefined, setValue: UseModelAttributeSet<TAttributes, TAttributeName, TOptions\>]

React.js Hook that provides the Backbone Models' attribute value and a
function to update it. It also watches received events to keep its value
synchronized with the model.

By default it watches `'sync'`, `'change'`,  and `'change:${name}'` events,
but you can change it with `watchEvents` option.

**`Example`**

```ts
const [name, setName] = useModelAttribute({
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
| `TAttributes` | extends `object` |
| `TAttributeName` | extends `string` |
| `TOptions` | `ModelSetOptions` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`UseModelAttributeOptions`](README.md#usemodelattributeoptions)<`TAttributes`, `TAttributeName`, `TOptions`\> |

#### Returns

[value: TAttributes[TAttributeName] \| undefined, setValue: UseModelAttributeSet<TAttributes, TAttributeName, TOptions\>]

#### Defined in

[useModelAttribute/useModelAttribute.ts:98](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useModelAttribute/useModelAttribute.ts#L98)

___

### useModelAttributes

▸ **useModelAttributes**<`TAttributes`, `TOptions`\>(`model`, `options?`): `TAttributes`

React.js Hook that provides the Backbone.js Model's attributes as an object.

**`Example`**

```ts
const attributes = useModelAttributes(user);

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  // Updates the model's attribute and re-renders the component.
  attributes.name = event.target.value;
};

return (
  <input
    type="text"
    value={attributes.name}
    onChange={handleChange}
  />
);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TAttributes` | extends `object` |
| `TOptions` | `ModelSetOptions` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `Model`<`TAttributes`, `TOptions`, `any`\> |
| `options?` | `TOptions` |

#### Returns

`TAttributes`

#### Defined in

[useModelAttributes/useModelAttributes.ts:30](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useModelAttributes/useModelAttributes.ts#L30)

___

### useObjectEventListener

▸ **useObjectEventListener**<`TObject`\>(`object`, `eventOrEvents`, `callback`): `void`

React.js Hook that listens object's events and executes the callback when
they happen. The object can be a Backbone Model, a Backbone Collection or
any Backbone object that implement its events interface.

**`Example`**

```js
useObjectEventListener(user, ['change'], function (this: UserModel) {
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

[useObjectEventListener/useObjectEventListener.ts:19](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectEventListener/useObjectEventListener.ts#L19)

___

### useObjectGetter

▸ **useObjectGetter**<`TResult`, `TObject`, `TValues`\>(`getter`, `options`): `TResult`

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

const fullName = useObjectGetter(getFullName, {
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
| `getter` | [`UseObjectGetterFunction`](README.md#useobjectgetterfunction)<`TResult`, `TObject`, `TValues`\> |
| `options` | [`UseObjectGetterOptions`](README.md#useobjectgetteroptions)<`TObject`, `TValues`\> |

#### Returns

`TResult`

#### Defined in

[useObjectGetter/useObjectGetter.ts:84](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectGetter/useObjectGetter.ts#L84)

___

### useObjectsEventsListeners

▸ **useObjectsEventsListeners**(`objectOrObjectsEvents`, `callback`): `void`

React.js Hook that listens the received objects' events and execute callback
when they happen.

**`Example`**

```js
const subjects = [
  [user, 'sync', 'change:roles'],
  [company, 'sync', 'change:roles_configuration'],
  [roles, 'sync'],
];

useObjectsEventsListeners(subjects, updateUserPermissions);

// or

useObjectsEventsListeners(
  [user, 'change:permissions'],
  updateUserPermissions,
);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `objectOrObjectsEvents` | [`ObjectEvents`](README.md#objectevents) \| [`ObjectsEvents`](README.md#objectsevents) |
| `callback` | [`AnyFunction`](README.md#anyfunction) |

#### Returns

`void`

#### Defined in

[useObjectsEventsListeners/useObjectsEventsListeners.ts:64](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/f34b939/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L64)
