[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / useModelAttribute

# Function: useModelAttribute()

> **useModelAttribute**\<`TAttributes`, `TAttributeName`, `TOptions`\>(`options`): \[`TAttributes`\[`TAttributeName`\], [`UseModelAttributeSet`](../type-aliases/UseModelAttributeSet.md)\<`TAttributes`, `TAttributeName`, `TOptions`\>\]

Defined in: [useModelAttribute/useModelAttribute.ts:98](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useModelAttribute/useModelAttribute.ts#L98)

React.js Hook that provides the Backbone Models' attribute value and a
function to update it. It also watches received events to keep its value
synchronized with the model.

By default it watches `'sync'`, `'change'`,  and `'change:${name}'` events,
but you can change it with `watchEvents` option.

## Type Parameters

### TAttributes

`TAttributes` *extends* `object`

### TAttributeName

`TAttributeName` *extends* `string`

### TOptions

`TOptions` = `ModelSetOptions`

## Parameters

### options

[`UseModelAttributeOptions`](../type-aliases/UseModelAttributeOptions.md)\<`TAttributes`, `TAttributeName`, `TOptions`\>

## Returns

\[`TAttributes`\[`TAttributeName`\], [`UseModelAttributeSet`](../type-aliases/UseModelAttributeSet.md)\<`TAttributes`, `TAttributeName`, `TOptions`\>\]

## Example

```ts
const [name, setName] = useModelAttribute({
  name: 'name',
  model: user,
  watchEvents: ['change:name', 'sync', 'rename'],
});

const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
  setName(event.target.value);
};

return <input value={name} onChange={handleChange} />;
```
