[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectEvents

# Type Alias: ObjectEvents

> **ObjectEvents** = \[`Events` \| `undefined` \| `null`, `string`[]\]

Defined in: [useObjectsEventsListeners/useObjectsEventsListeners.ts:23](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/974b445f407913593ca526d1771534f66ee4519c/src/useObjectsEventsListeners/useObjectsEventsListeners.ts#L23)

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
