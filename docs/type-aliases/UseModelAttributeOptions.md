[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / UseModelAttributeOptions

# Type Alias: UseModelAttributeOptions\<TAttributes, TAttributeName, TOptions\>

> **UseModelAttributeOptions**\<`TAttributes`, `TAttributeName`, `TOptions`\> = `object`

Defined in: [useModelAttribute/useModelAttribute.ts:62](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useModelAttribute/useModelAttribute.ts#L62)

Object that contains the attribute key, its model and a list of events to
watch in order to keep its value synchronized.

## Example

```ts
const options = {
  name: 'name',
  model: user,
  watchEvents: ['rename', 'change:name'],
} as UseModelAttributeOptions<UserAttributes, 'name'>;
```

## Type Parameters

### TAttributes

`TAttributes` *extends* `object`

### TAttributeName

`TAttributeName` *extends* [`KeyOf`](KeyOf.md)\<`TAttributes`\>

### TOptions

`TOptions` = `ModelSetOptions`

## Properties

### model

> **model**: `Model`\<`TAttributes`, `TOptions`\> \| `undefined` \| `null`

Defined in: [useModelAttribute/useModelAttribute.ts:68](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useModelAttribute/useModelAttribute.ts#L68)

***

### name

> **name**: `TAttributeName`

Defined in: [useModelAttribute/useModelAttribute.ts:67](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useModelAttribute/useModelAttribute.ts#L67)

***

### watchEvents?

> `optional` **watchEvents**: `string`[]

Defined in: [useModelAttribute/useModelAttribute.ts:69](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useModelAttribute/useModelAttribute.ts#L69)

***

### watchRelatedEvents?

> `optional` **watchRelatedEvents**: [`ObjectEvents`](ObjectEvents.md) \| [`ObjectsEvents`](ObjectsEvents.md)

Defined in: [useModelAttribute/useModelAttribute.ts:70](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useModelAttribute/useModelAttribute.ts#L70)
