[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / UseModelAttributeSet

# Type Alias: UseModelAttributeSet()\<TAttributes, TAttributeName, TOptions\>

> **UseModelAttributeSet**\<`TAttributes`, `TAttributeName`, `TOptions`\> = (`newValueOrFunction`, `options?`) => `void`

Defined in: [useModelAttribute/useModelAttribute.ts:37](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useModelAttribute/useModelAttribute.ts#L37)

Function that receives two arguments:
- The first can be both the new attribute value, or a function that receives
previous attribute value and returns the new one;
- The second one is the Models' set options, which is optional.

## Type Parameters

### TAttributes

`TAttributes` *extends* `object`

### TAttributeName

`TAttributeName` *extends* [`KeyOf`](KeyOf.md)\<`TAttributes`\>

### TOptions

`TOptions` = `ModelSetOptions`

## Parameters

### newValueOrFunction

`TAttributes`\[`TAttributeName`\] | (`value?`) => `TAttributes`\[`TAttributeName`\]

### options?

`TOptions`

## Returns

`void`

## Example

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
