[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / useModelAttributes

# Function: useModelAttributes()

> **useModelAttributes**\<`TAttributes`, `TOptions`\>(`model`, `options?`): `TAttributes`

Defined in: [useModelAttributes/useModelAttributes.ts:31](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useModelAttributes/useModelAttributes.ts#L31)

React.js Hook that provides the Backbone.js Model's attributes as an object.

## Type Parameters

### TAttributes

`TAttributes` *extends* `object`

### TOptions

`TOptions` *extends* `Silenceable` = `ModelSetOptions`

## Parameters

### model

`undefined` | `null` | `Model`\<`TAttributes`, `TOptions`, `any`\>

### options?

`TOptions`

## Returns

`TAttributes`

## Example

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
