[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / UseObjectGetterFunction

# Type Alias: UseObjectGetterFunction()\<TResult, TObject, TValues\>

> **UseObjectGetterFunction**\<`TResult`, `TObject`, `TValues`\> = (`object`, ...`values`) => `TResult`

Defined in: [useObjectGetter/useObjectGetter.ts:25](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useObjectGetter/useObjectGetter.ts#L25)

Function that uses a model, or a collection, and a list of values as
parameters to get the result.

## Type Parameters

### TResult

`TResult`

### TObject

`TObject` *extends* `Events` \| `undefined` \| `null`

### TValues

`TValues` *extends* `unknown`[] = \[\]

## Parameters

### object

`TObject`

### values

...`TValues`

## Returns

`TResult`

## Example

```ts
let getAvatar: UseObjectGetterFunction<Model<User>, [AppDetails]>;

getAvatar = (user, app) => {
  return `${app.baseUrl}/avatar/${user.get('companyId')}/${user.get('id')}`;
};
```
