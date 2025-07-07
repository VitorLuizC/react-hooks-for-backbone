[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / useObjectsEventsListeners

# Function: useObjectsEventsListeners()

> **useObjectsEventsListeners**(`objectOrObjectsEvents`, `callback`): `void`

Defined in: [useObjectsEventsListeners/useObjectsEventsListeners.ts:67](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L67)

React.js Hook that listens the received objects' events and execute callback
when they happen.

## Parameters

### objectOrObjectsEvents

[`ObjectEvents`](../type-aliases/ObjectEvents.md) | [`ObjectsEvents`](../type-aliases/ObjectsEvents.md)

### callback

[`AnyFunction`](../type-aliases/AnyFunction.md)

## Returns

`void`

## Example

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
