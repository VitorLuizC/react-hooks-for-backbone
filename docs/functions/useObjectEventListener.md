[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / useObjectEventListener

# Function: useObjectEventListener()

> **useObjectEventListener**\<`TObject`\>(`object`, `eventOrEvents`, `callback`): `void`

Defined in: [useObjectEventListener/useObjectEventListener.ts:19](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useObjectEventListener/useObjectEventListener.ts#L19)

React.js Hook that listens object's events and executes the callback when
they happen. The object can be a Backbone Model, a Backbone Collection or
any Backbone object that implement its events interface.

## Type Parameters

### TObject

`TObject` *extends* `Events`

## Parameters

### object

`undefined` | `null` | `TObject`

### eventOrEvents

`string` | `string`[]

### callback

(`this`, ...`args`) => `void`

## Returns

`void`

## Example

```js
useObjectEventListener(user, ['change'], function (this: UserModel) {
  updatePermissions(this.get('roles'));
});
```
