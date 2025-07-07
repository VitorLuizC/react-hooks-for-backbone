[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectEvents

# Type Alias: ObjectEvents

> **ObjectEvents** = \[`Events` \| `undefined` \| `null`, `string`[]\]

Defined in: [useObjectsEventsListeners/useObjectsEventsListeners.ts:23](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L23)

Tuple that contains a model, or a collection, and the event names to listen
from it in [useObjectsEventsListeners](../functions/useObjectsEventsListeners.md) hook.

## Example

```ts
const user = new Backbone.Model<UserAttributes>({ id });

const subject: ObjectEvents = [
  user,
  'change:name',
  'change:email',
  'change:email_confirmation'
];
```
