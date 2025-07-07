[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectsEvents

# Type Alias: ObjectsEvents

> **ObjectsEvents** = [`ObjectEvents`](ObjectEvents.md)[]

Defined in: [useObjectsEventsListeners/useObjectsEventsListeners.ts:42](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L42)

List of [ObjectEvents](ObjectEvents.md).

## Example

```ts
const user = new Backbone.Model<UserAttributes>({ id });

const subjects: ObjectsEvents = [
  [user, 'change:name'],
  [user, 'change:email', 'change:email_confirmation'],
];
```
