[**React.js Hooks for Backbone.js**](../README.md)

***

[React.js Hooks for Backbone.js](../README.md) / ObjectAsyncMethodKey

# Type Alias: ObjectAsyncMethodKey\<TObject\>

> **ObjectAsyncMethodKey**\<`TObject`\> = `{ readonly [TObjectKey in KeyOf<TObject>]: TObject[TObjectKey] extends AnyAsyncFunction ? TObjectKey : never }`\[[`KeyOf`](KeyOf.md)\<`TObject`\>\]

Defined in: [useObjectAsyncMethods/isObjectAsyncMethodKey.ts:4](https://github.com/VitorLuizC/react-hooks-for-backbone/blob/c933913f34e3d71aa5132aba125ed14cc1ec398d/src/useObjectAsyncMethods/isObjectAsyncMethodKey.ts#L4)

Union between object async method keys.

## Type Parameters

### TObject

`TObject` *extends* `object`
